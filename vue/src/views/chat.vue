<template>
  <div class="chat">
    <top :title="friend.username" lefticn="el-icon-back" righticn="el-icon-more" color="#0288D1"></top>
    <!-- 消息展示 -->
    <div class="mid"></div>
    <!-- 输入框 -->
    <div class="bottom">
      <input type="text" v-model="msgvalue" />
      <button :disabled="msgvalue == ''" @click="sendMessage">发送</button>
    </div>
  </div>
</template>
<script>
import top from "../components/top.vue";
import { Socket } from "dgram";
import WSocket from "../socket.js";
export default {
  name: "chat",
  data() {
    return {
      msgvalue: "",
      msglist: []
    };
  },
  components: {
    top
  },
  computed: {
    friend() {
      return this.$store.getters.frienddata;
    }
  },
  mounted() {
    WSocket.init(
      { user: this.friend },
      message => {
        console.log(message);
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    sendMessage() {
      // this.$socket.emit("chat", {
      //   msg: this.msgvalue,
      // });
      // this.msglist.push()
    }
  }
  // sockets: {
  //   connect: () => {
  //   },
  //   res: val => {
  //     console.log(val);
  //   }
  // }
};
</script>
<style scoped>
.bottom {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-top: 1px solid #d9d9d9;
  position: absolute;
  bottom: 0;
  padding: 8px;
  background-color: #0288d1;
}
.bottom input {
  width: 70%;
  height: 30px;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-left: 14px;
}
.bottom button {
  width: 20%;
  height: 34px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-left: 8px;
  outline: none;
  background-color: #f1f1f1;
}
.bottom button[disabled] {
  background-color: #d9d9d9;
  cursor: not-allowed;
  pointer-events: none;
}
</style>