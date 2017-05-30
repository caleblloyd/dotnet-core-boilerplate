import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import DotvueInitialData from './DotvueInitialData'

export let routeInitialDataMap = new Map<Route, DotvueInitialData<any>>();

export default class DotvueApp {

    initLoad: Promise<any>

    initialData = new Map<string, DotvueInitialData<any>>();

    ssrData: { [key: string]: any } = {};

    routesInMap = new Array<Route>();

    vueComponent: Vue

    constructor(router: VueRouter, template: string) {

        this.vueComponent = new Vue({
            router,
            template: template,
            computed: {
                dotvueApp: () => { return this }
            }
        })

        router.beforeResolve((to: Route, from: Route, next: any) => {
            let initialData = routeInitialDataMap.get(to);
            if (initialData) {
                routeInitialDataMap.delete(to);
                this.initialData.set(initialData.key, initialData)
            }
            next()
        })

        this.initLoad = new Promise((resolve, reject) => {
            router.onReady(async () => {
                resolve()
            })
        })
    }

}
