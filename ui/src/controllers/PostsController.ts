import Vue from 'vue'
import DotvueComponent from '../dotvue/DotvueComponent'
import DotvueInitialData from '../dotvue/DotvueInitialData'
import Post from '../models/Post'
import PostRepository from '../repositories/PostsRepository'
import ListTemplate from '../views/posts/list.html'
import ViewTemplate from '../views/posts/view.html'

const dataKeyList = "posts/list"

@DotvueComponent(module, {
  template: ListTemplate
})
export class List extends Vue{
  
  private static readonly dataKey = "posts/list"

  public posts = new Array<Post>();

  public async beforeRouteEnter (to: any, from: any, next: any) {
      let initialData = new DotvueInitialData<Post[]>(to, dataKeyList)
      await initialData.Set(PostRepository.all)
      next(true)
  }

  public beforeCreate(){
      this.posts = DotvueInitialData.Get<Post[]>(this, dataKeyList)
  }

}

const dataKeyView = "posts/view"

@DotvueComponent(module, {
  template: ViewTemplate
})
export class View extends Vue{
}
