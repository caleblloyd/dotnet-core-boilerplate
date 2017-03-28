import Vue, {ComponentOptions} from 'vue'
import VueRouter from 'vue-router'
import Component from 'vue-class-component'
import template from '../views/app/app.html'
import Routes from '../config/Routes'

// vendor css
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css';

// Register the router hooks with thier names for components
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave'
])

declare const System: any;

Vue.use(VueRouter)

export default class App{

    initLoad: Promise<any>

    vueComponent : Vue

    constructor(initialPath?: string){

        let router = new VueRouter({
            mode: 'history',
            routes: Routes
        })
        if (initialPath)
            router.push(initialPath)

        this.vueComponent = new Vue({
            router,
            template: template
        })

        this.initLoad = new Promise((resolve) => {
            router.onReady(() => {
                console.log("resolve")
                resolve()
            })
        })

    }

}
