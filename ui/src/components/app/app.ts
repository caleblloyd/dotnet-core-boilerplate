import Vue, {ComponentOptions} from 'vue'
import VueRouter from 'vue-router'
import Component from 'vue-class-component'
import template from './app.html'

declare const System: any;

Vue.use(VueRouter)

function makeLazyLoad(component: string){
  return () => System.import('../' + component).then((module : any) => {
      return module.default;
  }).catch((err : any) => {
      console.error(err);
      console.log("Chunk loading failed");
  });
}

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'posts', component: makeLazyLoad('posts/PostsComponent') },
        { path: '/authors', name: 'authors', component: makeLazyLoad('authors/AuthorsComponent') }
    ]
});

export const initLoad = new Promise((resolve, reject) => {
    router.onReady(() => {
      resolve()
    })
});

export default class App extends Vue{

    constructor(options?: ComponentOptions<Vue>){
        options = Object.assign({}, options, {
            router,
            template: template
        })
        super(options)
    }
}