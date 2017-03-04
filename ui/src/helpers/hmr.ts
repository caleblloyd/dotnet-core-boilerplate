import Vue from 'vue'
let api:any = require('vue-hot-reload-api')
declare const module: any;

if (module && module.hot){
    api.install(Vue);
}

export default function vueClassHmr(clModule: any, cl: typeof Vue) : typeof Vue{
    if (clModule && clModule.hot){
        let uniqueId = clModule.id
        clModule.hot.accept()
        if (!clModule.hot.data) {
            console.log("create " + uniqueId)
            api.createRecord(uniqueId, cl)
            
        } else {
            console.log("reload " + uniqueId)
            api.reload(uniqueId, cl)
        }
    }
    return cl;
}
