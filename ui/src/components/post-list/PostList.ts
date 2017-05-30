import Vue from 'vue'
import DotvueComponent from '../../dotvue/DotvueComponent'
import Post from '../../models/Post'
import template from './post-list.html'

@DotvueComponent(module, {
    template: template,
    props: ["posts"]
})
export default class PostList extends Vue {

    public posts: Post[]

}
