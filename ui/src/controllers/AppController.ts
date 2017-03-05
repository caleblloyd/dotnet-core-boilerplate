import Vue, {ComponentOptions} from 'vue'
import VueRouter from 'vue-router'
import Component from 'vue-class-component'
import template from '../views/app/app.html'

declare const System: any;

Vue.use(VueRouter)

export function makeLazyLoad(controller: string, component: string){
  return () => System.import('./' + controller).then((module : any) => {
      return module[component];
  }).catch((err : any) => {
      console.error(err);
      console.log("Chunk loading failed");
  });
}

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'posts', component: makeLazyLoad('PostsController', 'List') },
        { path: '/authors', name: 'authors', component: makeLazyLoad('AuthorsController', 'List') },
        { path: '/author', name: 'author', component: makeLazyLoad('AuthorsController', 'View') },
    ]
});

export const initLoad = new Promise((resolve, reject) => {
    router.onReady(() => {
      resolve()
    })
});

@Component({
    router,
    template
})
export default class App extends Vue{
}
