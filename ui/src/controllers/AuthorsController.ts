import Vue from 'vue'
import Component from 'vue-class-component'
import DotvueComponent from '../dotvue/DotvueComponent'
import ListTemplate from '../views/authors/list.html'
import ViewTemplate from '../views/authors/view.html'

@DotvueComponent(module, {
  template: ListTemplate
})
export class List extends Vue{
}

@DotvueComponent(module, {
  template: ViewTemplate
})
export class View extends Vue{
}
