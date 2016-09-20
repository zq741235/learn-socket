## WebSocket 分享

WebSocket protocol 是HTML5一种新的协议。它实现了浏览器与服务器全双工通信。

在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。

### 关于Websocket

它解决了web实时化的问题，相比传统http有如下好处：

一个WEB客户端只建立一个TCP连接

Websocket服务端可以推送(push)数据到web客户端.

有更加轻量级的头，减少数据传送量

在 WebSocket API，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。在此WebSocket 协议中，为我们实现即时服务带来了两大好处：
1. Header
互相沟通的Header是很小的-大概只有 2 Bytes
2. Server Push
服务器的推送，服务器不再被动的接收到浏览器的request之后才返回数据，而是在有新数据时就主动推送给浏览器。




### 服务器
在服务器方面，网上都有不同对websocket支持的服务器：

php - http://code.google.com/p/phpwebsocket/
jetty - http://jetty.codehaus.org/jetty/（版本7开始支持websocket）
netty - http://www.jboss.org/netty
ruby - http://github.com/gimite/web-socket-ruby
Kaazing - http://www.kaazing.org/confluence/display/KAAZING/Home
Tomcat - http://tomcat.apache.org/（7.0.27支持websocket，建议用tomcat8，7.0.27中的接口已经过时）
WebLogic - http://www.oracle.com/us/products/middleware/cloud-app-foundation/weblogic/overview/index.html（12.1.2開始支持）
node.js - https://github.com/Worlize/WebSocket-Node
**node.js - http://socket.io**
nginx - http://nginx.com/
mojolicious - http://mojolicio.us/
python - https://github.com/abourget/gevent-socketio
Django - https://github.com/stephenmcd/django-socketio
erlang - https://github.com/ninenines/cowboy.git

**注意**
websocket api在浏览器端的广泛实现似乎只是一个时间问题了, 值得注意的是服务器端没有标准的api, 各个实现都有自己的一套api, 并且jcp也没有类似的提案, 所以使用websocket开发服务器端有一定的风险.可能会被锁定在某个平台上或者将来被迫升级.



### 服务端事件代码
```javascript
io.on('connection', function(socket) {
  //建立连接

  socket.on('serverMsg', function(data) {
    //收到客户端推送消息
     socket.broadcast.emit('clientMsg', data);
     //推送消息给客户端
  });
  socket.on('disconnect', function(data) {
  //断开连接
  });

});

```
### 客户端事件代码
```javascript
 socket.on('connect', function(event) {
   //建立连接
  });

 socket.on('disconnect', function(event) {
 //客户端断开连接
 });
 socket.on('clientMsg', function(data) {
 //客户端收到服务端消息处理
 });
```

### 使用
    创建一个基于 "webpack" 模板的新项目
    $ vue init webpack my-project
    #进入目录
    $ cd my-project
    #安装依赖
    $ npm install
    # 安装 socket.io
    $ npm install socket.io --save-dev
    #启动应用
    $ npm run dev

**注意**
在`connection`事件的回调函数中，`socket`表示的是当前连接到服务器的那个客户端。所以代码`socket.emit('foo')`则只有自己收得到这个事件，而`socket.broadcast.emit('foo')`则表示向除自己外的所有人发送该事件，另外，上面代码中，`io`表示服务器整个socket连接，所以代码`io.sockets.emit('foo')`表示所有人都可以收到该事件。

