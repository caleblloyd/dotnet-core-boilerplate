import Vue from 'vue'
import Component from 'vue-class-component'
import DotvueComponent from '../dotvue/DotvueComponent'
import DotvueInitialData from '../dotvue/DotvueInitialData'
import ListTemplate from '../views/authors/list.html'
import ViewTemplate from '../views/authors/view.html'
import Author from '../models/Author'
import AuthorsRepository from '../repositories/AuthorsRepository'

const dataKeyList = "authors/list"

@DotvueComponent(module, {
  template: ListTemplate
})
export class List extends Vue{
  
  public authors = new Array<Author>();

  public async beforeRouteEnter (to: any, from: any, next: any) {
      let initialData = new DotvueInitialData<Author[]>(to, dataKeyList)
      await initialData.Set(AuthorsRepository.all)
      next(true)
  }

  public beforeCreate(){
      this.authors = DotvueInitialData.Get<Author[]>(this, dataKeyList)
  }

}

const dataKeyView = "authors/view"

@DotvueComponent(module, {
  template: ViewTemplate
})
export class View extends Vue{
}
