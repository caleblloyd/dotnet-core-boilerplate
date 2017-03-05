import Vue from 'vue'
import DotvueComponent from '../dotvue/DotvueComponent'
import Post from '../models/Post'
import PostRepository from '../repositories/PostsRepository'
import ListTemplate from '../views/posts/list.html'

@DotvueComponent(module, {
  template: ListTemplate
})
export class PostsComponent extends Vue{

  loading = true
  
  posts = new Array<Post>()

  constructor(){
    super()
    this.run()
  }

  data () {
    return {
      loading: this.loading,
      posts: this.posts
    }
  }

  async run(){
    this.posts = await PostRepository.all()
    this.loading = false
  }

}
