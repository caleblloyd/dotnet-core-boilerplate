import Vue from 'vue'
require('es6-promise').polyfill()
require('isomorphic-fetch')
import Blog from 'src/models/blog'

new Vue({
  el: '#app',
  render: h => <h1>Hello World 2!</h1>
})

Blog.all();
