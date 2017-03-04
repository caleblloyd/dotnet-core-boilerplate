import layout from './src/public/index.html'
import App, {router, initLoad} from './src/components/app/app'
import express from 'express'

let renderer = require('vue-server-renderer').createRenderer()

let server = express()
server.use('/assets', express.static(
  './dist/assets'
))

server.get('*', async (request: any, response: any) => {
  
  let appInstance = new App();
  router.push(request.url)
  await initLoad;

  renderer.renderToString(
    appInstance,
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

// Listen on port 5000
server.listen(5000, function (error: any) {
  if (error) throw error
  console.log('Server is running at localhost:5000')
})