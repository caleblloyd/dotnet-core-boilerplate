import Vue from 'vue'
declare const System: any;

System.import('./controllers/AppController').then(async (module : any) => {
    let app = (new module.default)
    await app.initLoad
    app.$mount('#app')
}).catch((err : any) => {
    console.error(err);
});
