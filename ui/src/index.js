import Vue from 'vue'
require('es6-promise').polyfill()
require('isomorphic-fetch')
import Blog from 'src/models/blog'

new Vue({
  el: '#app',
  render: h => <div>
    <h1>Container Demo Frontend</h1>
    <div>Using vue.js</div>
  </div>
})
