var path = require('path')
var zqsockets = require('./zqsockets')

var config = require('../config')
var port = process.env.PORT || config.dev.port

/*app and server 使用 zqsockets下的 */
var app = zqsockets.app
var server = zqsockets.server
// serve pure static assets
//var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = server.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
