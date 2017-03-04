import Vue from 'vue'
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

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'posts', component: makeLazyLoad('posts/PostsComponent') },
        { path: '/authors', name: 'authors', component: makeLazyLoad('authors/AuthorsComponent') }
    ]
});

new Vue({
  router,
  template: template
}).$mount("#app");