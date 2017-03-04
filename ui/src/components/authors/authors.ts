import Vue from 'vue'
import Component from 'vue-class-component'
import template from './authors.html'
import uuid from 'uuid'
let api:any = require('vue-hot-reload-api')
declare const module: any;

const options = {
  template: () => template
}
console.log(options)

@Component({
  template: template
})
class Authors extends Vue{
    constructor() {
        super()
        console.log("constructor")
    }
}

if (module && module.hot){
    api.install(Vue)
    module.hot.accept()
    if (!module.hot.data) {
        console.log("create")
        api.createRecord("asdf", Authors)
        console.log("created")
        
    } else {
        console.log("reload")
        api.reload("asdf", Authors)
        console.log("reloaded")
    }
}

export default Authors