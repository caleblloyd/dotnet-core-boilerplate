import Vue from 'vue'
import Component from 'vue-class-component'
import template from './AuthorsView.html'
import hmr from '../../helpers/hmr'

const options = {
  template: () => template
}
console.log(options)

@Component({
  template: template
})
class AuthorsComponent extends Vue{
}

export default hmr(module, AuthorsComponent)
