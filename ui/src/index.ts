import Vue from 'vue'
import App from './controllers/AppController'

async function runApp(){
    let app = new App()
    await app.initLoad
    app.vueComponent.$mount('#app')
}

runApp()
