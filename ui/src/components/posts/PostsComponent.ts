import Vue from 'vue'
import Component from 'vue-class-component'
import template from './PostsView.html'
import hmr from '../../helpers/hmr'
import PostRepository from '../../repositories/PostsRepository'

@Component({
  template: template
})
class PostsComponent extends Vue{
}

(async() => {
  let posts = await PostRepository.all()
  if (posts.length > 0)
    console.log(posts[0].title)
})()


export default hmr(module, PostsComponent)
