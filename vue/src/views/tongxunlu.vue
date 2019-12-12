<template>
  <div class="tongxunlu">
    <leftdrawer title="通讯录"></leftdrawer>
    <div class="search">
      <div class="find">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="搜索" v-model="inputetext" />
      </div>
    </div>
    <scroller
    height="86%"
    class="scroller"
      :on-refresh="refresh"
      refreshLayerColor="#333"
      refreshText="松手刷新"
      ref="my_scroller"
    >
    <div class="mid">
      <friendlist
        v-for="(data,index) in frienddata"
        :key="index"
        :avatar="data.avatar"
        :username="data.username"
        @click="clickfriend(data)"
      />
      <div class="buttom">共{{frienddata.length}}位联系人</div>
    </div>
    </scroller>
  </div>
</template>
<script>
import leftdrawer from "../components/leftdrawer.vue";
import friendlist from "../components/friendlist.vue";
export default {
  name: "tongxunlu",
  data() {
    return {
      frienddata: [],
      inputetext: "",
      finddatas: []
    };
  },
  components: {
    leftdrawer,
    friendlist
  },
  methods: {
    //请求通讯录列表
    getdata() {
      this.$axios.post("/api/frienddatas").then(res => {
        this.frienddata = res.data;
        this.finddatas = res.data;
      });
    },
    //查找
    finddata() {
      this.frienddata = this.finddatas.filter(friend => {
        return friend.username.indexOf(this.inputetext) != -1;
      });
    },
    //点击朋友列表执行的方法
    clickfriend(data) {
      this.$store.dispatch("setfrienddata", data);
      this.$router.push("/userinfo");
    },
    refresh(){
      this.getdata();
      this.$refs.my_scroller.finishPullToRefresh();
    }
  },
  watch: {
    //监听搜索框
    inputetext() {
      this.finddata();
    }
  },
  created() {
    this.getdata();
  }
};
</script>
<style scoped>
.mid {
  position: relative;
  top:0;
  width: 100%;
  z-index: -1;
  margin-bottom: 60px
}
.scroller{
  position:absolute;
  top:90px;
  height: 90%;
}
.search {
  background: #f1efef;
  position: fixed;
  height: 40px;
  width: 100%;
  margin-top: 50px;
}
.find {
  top: 10px;
  height: 30px;
  width: 90%;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  margin-top: 5px;
}
.find i {
  color: #888;
  margin-left: 8px;
}
.find input {
  height: 26px;
  width: 90%;
  outline: none;
  border: none;
  font-size: 14px;
}
.buttom{
  width: 100%;
  height: 26px;
  text-align: center;
  color: rgb(112, 112, 112);
  font-size: 16px;
  line-height: 30px
}
</style>