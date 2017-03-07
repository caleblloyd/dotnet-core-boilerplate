import layout from './src/public/index.html'
import App from './src/controllers/AppController'
import express from 'express'

let renderer = require('vue-server-renderer').createRenderer()

let server = express()
server.use('/assets', express.static(
  './dist/assets'
))

server.get('/favicon.ico', (request: any, response: any) => {
    response.status(204).send()
})

server.get('*', async (request: any, response: any) => {
  
  let app = new App(request.url);
  await app.initLoad;

  renderer.renderToString(
    app.vueComponent,
    function (error:any, html:any) {
      if (error) {
        console.error(error)
        return response
          .status(500)
          .send('Server Error')
      }
      response.send(layout.replace('<div id="app"></div>', html))
    })

})

// Listen on port 4000
server.listen(4000, '0.0.0.0', function (error: any) {
  if (error) throw error
  console.log('Server is running at 0.0.0.0:4000')
})
