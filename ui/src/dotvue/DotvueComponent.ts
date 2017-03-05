import Vue, { ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import { VueClass } from 'vue-class-component/lib/declarations'

interface HotModule extends NodeModule{
    hot: {
        accept: () => null
        data: {}
    }
}
declare const module: HotModule;

let api: any;
if (module && module.hot){
    api = require('vue-hot-reload-api')
    api.install(Vue);
}

export default function DotvueComponent <U extends Vue>(nodeModule: NodeModule, options: ComponentOptions<U>): <V extends VueClass>(target: V) => V
export default function DotvueComponent <V extends VueClass>(nodeModule: NodeModule, target: V): V
export default function DotvueComponent <V extends VueClass, U extends Vue>(nodeModule: NodeModule, options: ComponentOptions<U> | V): any {
    let componentDecorator = Component(options)
    let nodeHotModule = nodeModule as HotModule

    return function (target: V) : VueClass{

        let originalClassName = target.name
        let component = componentDecorator(target)

        // handle hot module reloading
        if (nodeHotModule && nodeHotModule.hot){
            let uniqueId = nodeHotModule.id + '/' + originalClassName
            nodeHotModule.hot.accept()        
            if (!nodeHotModule.hot.data) {
                console.log("create " + uniqueId)
                api.createRecord(uniqueId, component)
                
            } else {
                console.log("reload " + uniqueId)
                api.reload(uniqueId, component)
            }

        }

        return component;
    }

}
