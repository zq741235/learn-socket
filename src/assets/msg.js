import msglist from '../components/msglist'

//var socket = io.connect('http://localhost');
//
//var io = require('socket.io')(server)

var socket = io.connect();
//var socket;
var clientId;

/**
 * usertype 1 是自己 2 是别人 3 是系统
 */
export default {
  components: {
    msglist
  },
  data: function() {
    return {
      onlineTips: 'hello world',
      msgcont: '',
      msglist: []
    }
  },
  ready: function() {
    var that = this;
    socket.on('connect', function(event) {
      that.onlineTips = '你已进入奇幻世界。。。'
    });
    socket.on('disconnect', function(event) {
      clientId = null;
      that.onlineTips = '你被金木水火土叨叨赶了出去。。'
    });
    socket.on('clientMsg', function(data) {
      var usertype = data.userid == clientId ? '1' : '2';
      var obj = {
        "usertype": usertype,
        "date": that.getDate(),
        "avatar": require('./avatar/' + data.avatar + '.jpg'),
        "msg": data.msg,
        "name": data.userid
      };
      that.setHtml(obj);
    });
    socket.on('system', function(data) {
      if (data.type == 'login') {
        //  console.log(data)
        if (!clientId) {
          clientId = data.userid;
        }
        var obj = {
          "usertype": 3,
          "date": that.getDate(),
          "msg": data.msg,
          "name": "aa2",
          "id": clientId
        };
        that.setHtml(obj);
      } else if (data.type == 'logout') {

        if (!clientId) {
          clientId = data.userid;
        }
        console.log(data)
        var obj = {
          "usertype": 3,
          "date": that.getDate(),
          "msg": data.msg,
          "name": "aa2",
          "id": clientId
        };
        that.setHtml(obj);

      }
    });

  },
  methods: {
    trim: function(str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    getDate: function() {
      var minute = new Date().getMinutes();
      var date = new Date().getHours() + ':' + (minute < 10 ? '0' + minute : minute);
      return date;
    },
    sendmsg: function(msg, direction) {
      var that = this;
      // 方法内 `this` 指向 vm
      if (that.trim(that.msgcont) == "") {
        return;
      }
      var obj = {
        'msg': that.msgcont,
        'userid': clientId
      }
      socket.emit('serverMsg', obj);
    },
    setHtml: function(data) {
      var that = this;
      // console.log(data)
      that.msglist.push(data);
      //  console.log(that.msglist.length)
      if (data.usertype == '1') {
        that.msgcont = "";
      }
      that.$nextTick(function() {
        // DOM 更新了
        var box = document.querySelector(".J_letter_msg");
        box.scrollTop = box.scrollHeight;
      })


    }
  }
}
