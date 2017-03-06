import Vue, {ComponentOptions} from 'vue'
import VueRouter from 'vue-router'
import Component from 'vue-class-component'
import template from '../views/app/app.html'
import Routes from '../config/Routes'

// Register the router hooks with thier names for components
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave'
])

declare const System: any;

Vue.use(VueRouter)

export default class App extends Vue{

    initLoad: Promise<any>

    constructor(initialPath?: string){

        let router = new VueRouter({
            mode: 'history',
            routes: Routes
        })
        if (initialPath)
            router.push(initialPath)

        let options = {
            router,
            template: template
        }

        super(options);

        this.initLoad = new Promise((resolve) => {
            router.onReady(() => {
                console.log("resolve")
                resolve()
            })
        })

    }

}
