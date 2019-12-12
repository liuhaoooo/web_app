<template>
  <div class="leftdrawer">
    <top :title="title" righticn="el-icon-plus" color="#0288D1" @avatarclick="drawer=true"></top>
    <el-drawer :visible.sync="drawer" size="70%" direction="ltr">
      <div class="m">
        <div class="img">
          <img :src="user.avatar" />
        </div>
        <div class="name">
          <span>{{user.username}}</span>
        </div>
      </div>
      <list
        name="个人资料"
        righticon="el-icon-arrow-right"
        leftticon="el-icon-user-solid"
        @click="changeavatar"
      ></list>
      <list name="设置" righticon="el-icon-arrow-right" leftticon="el-icon-s-tools"></list>
      <div class="btn" @click="unlogin">退出登录</div>
    </el-drawer>
  </div>
</template>
<script>
import top from "../components/top.vue";
import list from "../components/list.vue";
export default {
  name: "leftdrawer",
  components: {
    top,
    list
  },
  computed: {
    user() {
      return this.$store.getters.userdatas;
    }
  },
  props: {
    title: String
  },
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    unlogin() {
      if (localStorage.usertoken) {
        localStorage.removeItem("usertoken");
        this.$router.push("/login");
      }
    },
    changeavatar() {
      this.$router.push("/userdatas");
    }
  }
};
</script>
<style scoped>
.m {
  height: 150px;
}
.m img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.name {
  width: 50%;
  height: 70px;
  font-size: 24px;
  position: absolute;
  left: 38%;
  line-height: 100px;
}
.img {
  width: 70px;
  height: 70px;
  position: absolute;
  left: 20px;
}
.btn {
  width: 70%;
  height: 38px;
  background: #F44336;
  text-align: center;
  color: white;
  font-size: 20px;
  line-height: 38px;
  margin: 100px auto;
  border-radius: 8px;
}
</style>