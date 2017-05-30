import Vue from 'vue'
import newApp from './controllers/AppController'

async function runApp() {
    let app = newApp()
    await app.initLoad
    app.vueComponent.$mount('#app')
}

runApp()
