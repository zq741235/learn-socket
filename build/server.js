var path = require('path')

var config = require('../config')

var port = process.env.PORT ||8388


var express = require('express')

var app = require('./sockets').app ;
var server = require('./sockets').server ;




 var staticPath = path.posix.join(config.build.assetsPublicPath, 'dist', config.build.assetsSubDirectory)

console.log(staticPath)

app.use('/',express.static(config.build.assetsRoot));



server.listen(port,function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

require('./sockets').ioSocket();


