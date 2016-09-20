<template>
  <div id="app" class="main">
    <!-- Tab -->
    <div class="tabs_box1_lq">
      <div class="tabs_lq">
        <a class="blue-bottom J_tipsStr">
          {{onlineTips}}
        </a>
        <div class="float-r pblue-color">消息记录</div>
      </div>
    </div>
    <!-- message-box -->
    <div class="letter-message-box">
      <!-- <p>查看更多<i class="see-more-icon"></i></p> -->
      <div class="letter-message J_letter_msg">
      <msglist></msglist>
      </div><!-- end letter-message -->
    </div><!-- end letter-message box-->
    <!-- 发送框 -->
    <div class="letter-content">
      <p class="cont-tips"><label>安全提示:</label>请不要轻易透漏您的联系方式, 不要借钱给陌生人。</p>
      <div id="pub_moodsub_wsf" class="textarea-outter   js_big_mood">
        <textarea class=" letter-textarea J_textarea"  v-on:keyup.enter="sendmsg" v-model="msgcont"></textarea>
        <div class="submit-bottom js_mood_bottom">

          <div class="input_infobox_rq">
            <a class="mood_submitbtn1_lq J_sendBtn" v-on:click="sendmsg">发送  (ENTER)</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./assets/msg.js"></script>
<style src='./assets/message.css'></style>
