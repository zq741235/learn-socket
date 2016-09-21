var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')

var port = process.env.PORT || config.dev.port

var app = express();

var server = require('http').createServer(app);


// serve pure static assets
//var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)

app.use(staticPath, express.static('./static'))

var ioSocket = function() {

  var io = require('socket.io').listen(server);

  var userArr = [], //用户数组
    userLength = 0,
    userNumber = 0; //用户序号

  io.on('connection', function(socket) {

    var avatarNum = Math.floor(Math.random() * 94); //给用户随机分配一个头像

    // socket.avatar = avatarNum;
    //socket.avatar = require('assets/avatar/' +avatarNum + '.jpg');
    socket.avatar = avatarNum;

    socket.userIndex = userArr.length; //用户在数组中的索引

    socket.userid = userNumber; // 用户序号作为用户标识

    userLength++;

    userArr.push(socket.userIndex);

    console.log(userArr, userLength);

    userNumber++;

    var obj = {
      "type": "login",
      "userid": socket.userid,
      "msg": socket.userid + "上线啦！"
    };
    console.log(obj)
      //通知登录者
    socket.emit('system', {
      "type": "login",
      "userid": socket.userid,
      "msg": socket.userid + ",欢迎来到聊天室！"
    });
    //io.sockets.emit('system', obj);//通知 所有人
    socket.broadcast.emit('system', obj); //通知除了你的所有人

    //new message get
    socket.on('serverMsg', function(data) {

      data.avatar = socket.avatar;
      //将消息输出到控制台
      console.log(data);
      io.sockets.emit('clientMsg', data);
    });
    socket.on('disconnect', function(data) {
      userLength--;
      obj.type = 'logout';
      obj.userid = socket.userid;
      obj.msg = socket.userid + "离开了聊天室！"
      userArr.splice(socket.userIndex, 1, '*');
      console.log(obj)
      console.log(userArr, userLength)
      socket.broadcast.emit('system', obj);


      //将断开连接的用户从user数组中删除
      //通知除自己以外的所有人
      /* socket.broadcast.emit('system', socket.nickname, users.length, 'logout');*/
    });

  });
}

//ioSocket();


/*module.exports = server.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})*/


module.exports = {
  ioSocket: ioSocket ,
  app : app ,
  server :server
}
