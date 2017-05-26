import Vue from 'vue'
import {Route} from 'vue-router'
import DotvueApp, {routeInitialDataMap} from './DotvueApp'

declare const window:any;
let ssrWindowData: {[key:string]:any} = {}

if (typeof(window) !== 'undefined' && window.DotvueInitialData){
    ssrWindowData = window.DotvueInitialData
    delete window.DotvueInitialData
}

export default class DotvueInitialData<T>{

    key: string

    data: T

    constructor(to: Route, key: string){
        this.key = key
        routeInitialDataMap.set(to, this)
    }

    public async Set(promiseFn: () => Promise<T>){
        if (ssrWindowData[this.key]){
            this.data = ssrWindowData[this.key]
            delete ssrWindowData[this.key]
        } else {
            this.data = await promiseFn()
        }
    }

    public static Get<T>(vm: Vue, key: string) : T {
        let dotvueApp = ((vm.$root as any).dotvueApp as DotvueApp)
        let initialData = dotvueApp.initialData.get(key)
        if (initialData){
            dotvueApp.initialData.delete(key)
            dotvueApp.ssrData[key] = initialData.data
            return initialData.data
        }
        return null;
    }

}
