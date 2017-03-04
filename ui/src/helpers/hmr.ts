import Vue from 'vue'
declare const module: any;

var api: any;

if (module && module.hot){
    api = require('vue-hot-reload-api')
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
