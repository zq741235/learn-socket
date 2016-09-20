<template>
  <div v-for="(index, item) in msglist" class="itembox">
    <div  v-if="item.usertype=='2'" class="msg-left">
     <div class="avatar-box">
       <a href="#" title="{{item.name}}">
       <img v-bind:src="item.avatar"/>
       </a>
       <span class="rt-num" style="visibility: hidden;">25</span>
     </div>
     <div class="msg-cont msg-cont-left">
       <i class="triggle-left"></i>
       <i class="close-icon"></i>
       <p class="msg-cont-cont">{{item.msg}}  </p>
       <div>
         <label class="float-r msg-time">{{item.date}}</label>
       </div>
     </div>
   </div>

   <div v-if="item.usertype=='3'" class="system-msg">
     <p>{{item.msg}}</p>
   </div>

   <div  v-if="item.usertype=='1'" class="msg-right">
     <div class="msg-cont msg-cont-right">
       <i class="triggle-right"></i>
       <i class="close-icon"></i>
       <p class="msg-cont-cont js_msgccont">{{item.msg}}  </p>
       <div>
         <label class="float-r msg-time">{{item.date}}</label>
       </div>
     </div>
     <div class="avatar-box">
       <a href="#" title="{{item.name}}">
       <img v-bind:src="item.avatar"/>
       </a>
       <span class="rt-num" style="visibility: hidden;">25</span>
     </div>
   </div>

 </div>
</template>

<script>
  export default {
    data: function () {
      return this.$parent.$data
    }
  }
</script>

