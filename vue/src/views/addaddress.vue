<template>
  <div class="addaddress">
    <top title="添加地址" lefticn="el-icon-close" righticn="el-icon-s-operation" color="#0288D1"></top>
    <!-- 搜索框 -->
    <div class="search">
      <div class="find">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="搜索" v-model="inputetext" />
      </div>
      <div class="back" @click="inputetext=''">取消</div>
    </div>
    <!-- 地址列表 -->
    <div class="mid" id="container">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
import top from "../components/top.vue";
export default {
  name: "addaddress",
  data() {
    return {
      inputetext: ""
    };
  },
  components: {
    top
  },
  methods: {
    getaddress(val) {
      AMap.plugin("AMap.Autocomplete", () => {
        var autoOptions = {
          city: "桂林"
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(val, (err, res) => {
          console.log(res)
        });
      });
    }
  },
  watch: {
    inputetext() {
        this.getaddress(this.inputetext)
    }
  }
};
</script>
<style scoped>
.mid {
  position: relative;
  width: 100%;
  top: 90px;
  z-index: -1;
}
.search {
  background: #f1efef;
  position: fixed;
  height: 40px;
  width: 100%;
  margin-top: 50px;
}
.back {
  width: 40px;
  height: 28px;
  top: 6px;
  position: absolute;
  right: 18px;
  text-align: center;
  line-height: 28px;
  font-size: 18px;
}
.find {
  top: 10px;
  height: 30px;
  width: 78%;
  margin-left: 20px;
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
</style>