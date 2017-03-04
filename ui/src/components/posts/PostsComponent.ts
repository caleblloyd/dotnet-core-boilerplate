import Vue from 'vue'
import Component from 'vue-class-component'
import template from './PostsView.html'
import hmr from '../../helpers/hmr'
import Post from '../../models/Post'
import PostRepository from '../../repositories/PostsRepository'

@Component({
  template: template
})
class PostsComponent extends Vue{

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

export default hmr(module, PostsComponent)
