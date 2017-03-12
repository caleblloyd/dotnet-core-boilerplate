import Vue from 'vue'
import DotvueComponent from '../dotvue/DotvueComponent'
import DotvueInitialData from '../dotvue/DotvueInitialData'
import Post from '../models/Post'
import PostRepository from '../repositories/PostsRepository'
import ListTemplate from '../views/posts/list.html'

let posts = new DotvueInitialData
@DotvueComponent(module, {
  template: ListTemplate
})
export class List extends Vue{

  data () {
    return {
      posts: posts.Get()
    }
  }

  async beforeRouteEnter (to: any, from: any, next: any) {
    await posts.Set(PostRepository.all())
    next(true)
  }

}
