<template>
  <div class="userinfo">
    <top lefticn="el-icon-back" righticn="el-icon-more" title="详情"></top>
    <div class="mid">
      <div class="img">
        <img :src="frienddata.avatar" />
      </div>
      <div class="name">
        <span>{{frienddata.username}}</span>
      </div>
    </div>

    <div class="btn" @click="send">发消息</div>
  </div>
</template>
<script>
import top from "../components/top.vue";
export default {
  name: "userinfo",
  components: {
    top
  },
  computed: {
    frienddata() {
      return this.$store.getters.frienddata;
    }
  },
  methods: {
    send() {
      this.$router.push("/chat");
    }
  }
};
</script>
<style scoped>
.mid {
  width: 100%;
  height: 240px;
  background: rgba(195, 201, 195, 0.63);
  position: fixed;
  top: 0;
}
.mid img {
  width: 86px;
  height: 86px;
  border-radius: 50%;
}
.name {
  width: 50%;
  text-align: center;
  height: 30px;
  font-size: 24px;
  position: absolute;
  top: 78%;
  left: 26%;
}
.img {
  width: 90px;
  height: 90px;
  position: absolute;
  left: 40%;
  bottom: 30%;
}
.btn {
  width: 70%;
  height: 46px;
  background: #0288D1;
  text-align: center;
  color: white;
  font-size: 20px;
  line-height: 44px;
  border-radius: 10px;
  position: fixed;
  bottom: 14px;
  left: 62px;
}
</style>