import Vue from 'vue'
import { Route } from 'vue-router'
import DotvueComponent from '../dotvue/DotvueComponent'
import DotvueInitialData from '../dotvue/DotvueInitialData'
import Post from '../models/Post'
import PostRepository from '../repositories/PostsRepository'
import ListTemplate from '../views/posts/list.html'
import ViewTemplate from '../views/posts/view.html'
import PostList from '../components/post-list/PostList'

const dataKeyList = "posts/list"

@DotvueComponent(module, {
    template: ListTemplate,
    components: { 'post-list': PostList }
})
export class List extends Vue {

    public posts = new Array<Post>();

    public async beforeRouteEnter(to: any, from: any, next: any) {
        let initialData = new DotvueInitialData<object[]>(to, dataKeyList)
        await initialData.Set(PostRepository.all)
        next(true)
    }

    public created() {
        this.posts = Post.convertAll(DotvueInitialData.Get<object[]>(this, dataKeyList))
    }

}

const dataKeyView = "posts/view"

@DotvueComponent(module, {
    template: ViewTemplate
})
export class View extends Vue {

    public post = new Post();

    public async beforeRouteEnter(to: Route, from: Route, next: any) {
        let initialData = new DotvueInitialData<object>(to, dataKeyView)
        await initialData.Set(async () => { return await PostRepository.one(Number(to.params.id)) })
        next(true)
    }

    public async beforeRouteUpdate(to: Route, from: Route, next: any) {
        this.post = new Post(await PostRepository.one(Number(to.params.id)))
        next(true)
    }

    public created() {
        this.post = new Post(DotvueInitialData.Get<object>(this, dataKeyView))
    }

}
