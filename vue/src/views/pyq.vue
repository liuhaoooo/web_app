<template>
  <div class="pyq">
    <top
      title="朋友圈"
      lefticn="el-icon-back"
      righticn="el-icon-share"
      color="#0288D1"
      @titleclick="toback"
    ></top>
    <!-- 添加朋友圈 -->
    <div class="addpyq" @click="toaddpyq">
      <i class="mdui-icon el-icon-plus"></i>
    </div>
    <!-- 刷新 -->
    <scroller
      class="scroller"
      :on-refresh="refresh"
      :on-infinite="infinite"
      refreshLayerColor="#333"
      refreshText="松手刷新"
      ref="my_scroller"
    >
      <div class="mid">
        <!-- 朋友圈信息顶部部分 -->
        <div class="me">
          <img :src="user.avatar" />
        </div>
        <!-- 朋友圈信息展示部分 -->
        <div class="pyqinfo" v-for="(pyq,index) in pyqdata" :key="index">
          <div class="top">
            <img :src="pyq.avatar" />
            {{pyq.username}}
          </div>
          <div class="text" v-if="pyq.text">{{pyq.text}}</div>

          <div class="bottom" v-if="pyq.img">
            <div class="responsive" v-for="(img,index) in JSON.parse(pyq.img)" :key="index">
              <div class="img">
                <img :src="img" alt width="100%" height="100%" />
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
          
          <div class="time">{{pyq.time}}</div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import top from "../components/top";
export default {
  name: "pyq",
  data() {
    return {
      pyqdata: [],
      offset: 0,
      top: 0
    };
  },
  components: {
    top
  },
  computed: {
    user() {
      return this.$store.getters.userdatas;
    }
  },
  methods: {
    //转换日期函数
    changedate(val) {
      let date = new Date(val);
      let Y = date.getFullYear() + "年";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      let D =
        date.getDate() > 9
          ? date.getDate() + "日"
          : "0" + date.getDate() + "日";
      let h =
        date.getHours() > 9
          ? date.getHours() + ":"
          : "0" + date.getHours() + ":";
      let m =
        date.getMinutes() > 9
          ? date.getMinutes() + ""
          : "0" + date.getMinutes() + "";
      return Y + M + D + h + m;
    },
    //获取朋友圈内容实现懒加载功能
    getpyq() {
      this.$axios
        .post("/api/getpyq", { offset: this.offset })
        .then((res, err) => {
          if (err) {
            throw err;
          }
          for (let data of res.data) {
            data.time = this.changedate(data.time);
            this.pyqdata.push(data);
          }
        });
    },
    //跳转发朋友圈页面
    toaddpyq() {
      this.$router.push("/addpyq");
    },
    //返回顶部
    toback() {
      this.$refs.my_scroller.scrollTo(0, 0);
    },
    //下拉刷新
    refresh() {
      // this.getpyq();
      this.$refs.my_scroller.finishPullToRefresh();
    },
    //上拉加载
    infinite() {
      this.getpyq();
      this.offset += 5;
      this.$refs.my_scroller.finishInfinite(true);
    },
    whatchscroll() {
      this.top = this.$refs.my_scroller.getPosition().top;
      console.log(this.top);
    }
  }
};
</script>
<style scoped>
.mid {
  position: relative;
  top: 0;
  width: 100%;
  background: rgb(255, 255, 255);
}
.scroller {
  position: absolute;
  top: 50px;
}
.addpyq {
  z-index: 1000;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  background: rgba(2, 137, 209, 0.664);
}

.addpyq i {
  position: absolute;
  right: 18px;
  top: 18px;
}

.me {
  top: 0;
  width: 100%;
  height: 200px;
  background: url("../../public/eee.jpg");
}
.me img {
  position: absolute;
  width: 70px;
  height: 70px;
  top: 150px;
  right: 10px;
}
.pyqinfo {
  width: 100%;
  margin-top: 20px;
}
.text {
  min-height: 30px;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  color: #666;
}
.top {
  width: 100%;
  color: rgb(105, 105, 105);
  font-size: 20px;
}
.top img {
  width: 40px;
  height: 40px;
}

.bottom {
  width: 100%;
}
.time {
  color: #999;
  width: 100%;
  height: 20px;
  line-height: 24px;
  text-align: right;
  font-size: 14px;
}

.bottom.img img {
  width: 100%;
  height: auto;
}

* {
  box-sizing: border-box;
}

.responsive {
  float: left;
  width: 24.99999%;
}

@media only screen and (max-width: 400px) {
  .responsive {
    width: 49.9999%;
    margin: 1px 0;
  }
}

@media only screen and (max-width: 300px) {
  .responsive {
    width: 100%;
  }
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
</style>