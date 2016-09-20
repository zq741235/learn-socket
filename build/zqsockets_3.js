

var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')

var port = process.env.PORT || config.dev.port
  //var app = express()
var app = require('./dev-server.js').app; // 此处的app必须使用server的app

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))


module.exports = server.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

var userArr = [],
  userid = 0;

io.on('connection', function(socket) {
var avatarNum = Math.floor(Math.random()*11);
var avatarStr = 'http://zhouqing.win/icon/'+avatarNum+'.jpg';
  userArr.push(userid++);

  socket.id = userid ;
  socket.avatar= avatarStr;
  var obj = {
    "type": "login",
    "userid":  socket.id  ,
    "msg" : userid + "上线啦！"
  };
 // console.log(socket)
  console.log(obj.userid + ':' +obj.msg)

 // socket.emit('system', obj);
  socket.broadcast.emit('system', obj);

  //
  socket.on('postmsg', function(data) {
    data.avatar = socket.avatar;
    //将消息输出到控制台
    console.log(data.userid + ':' + data.msg);
     socket.broadcast.emit('message', data);
  //  io.sockets.emit('message', data);
  });
  socket.on('disconnect', function(data) {
    obj.type = 'logout';
    obj.userid = socket.id;
    obj.msg = socket.id + "下线啦！"
    socket.broadcast.emit('system', obj);
    console.log(data.userid + ':' + obj.msg )
      //将断开连接的用户从users中删除
      //通知除自己以外的所有人
      /* socket.broadcast.emit('system', socket.nickname, users.length, 'logout');*/
  });
});
