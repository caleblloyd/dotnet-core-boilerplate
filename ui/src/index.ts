import Vue from 'vue'
declare const System: any;

System.import('./components/app/app').then(async (module : any) => {
    let app = (new module.default)
    await module.initLoad;
    app.$mount('#app')
}).catch((err : any) => {
    console.error(err);
});
