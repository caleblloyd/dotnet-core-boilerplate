import Vue from 'vue'
import { Route } from 'vue-router'
import Component from 'vue-class-component'
import DotvueComponent from '../dotvue/DotvueComponent'
import DotvueInitialData from '../dotvue/DotvueInitialData'
import ListTemplate from '../views/authors/list.html'
import ViewTemplate from '../views/authors/view.html'
import Author from '../models/Author'
import AuthorsRepository from '../repositories/AuthorsRepository'
import PostList from '../components/post-list/PostList'

const dataKeyList = "authors/list"

@DotvueComponent(module, {
    template: ListTemplate
})
export class List extends Vue {

    public authors = new Array<Author>();

    public async beforeRouteEnter(to: Route, from: Route, next: any) {
        let initialData = new DotvueInitialData<object[]>(to, dataKeyList)
        await initialData.Set(AuthorsRepository.all)
        next(true)
    }

    public created() {
        this.authors = Author.convertAll(DotvueInitialData.Get<Author[]>(this, dataKeyList))
    }

}

const dataKeyView = "authors/view"

@DotvueComponent(module, {
    template: ViewTemplate,
    components: { 'post-list': PostList }
})
export class View extends Vue {

    public author = new Author();

    public async beforeRouteEnter(to: Route, from: Route, next: any) {
        let initialData = new DotvueInitialData<object>(to, dataKeyView)
        await initialData.Set(async () => { return await AuthorsRepository.one(Number(to.params.id)) })
        next(true)
    }

    public async beforeRouteUpdate(to: Route, from: Route, next: any) {
        this.author = new Author(await AuthorsRepository.one(Number(to.params.id)))
        next(true)
    }

    public created() {
        this.author = new Author(DotvueInitialData.Get<object>(this, dataKeyView))
    }

}
