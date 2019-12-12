<template>
  <div class="userdatas">
    <top lefticn="el-icon-close" righticn="el-icon-s-operation"></top>
    <div class="mid">
      <!-- 改头像 -->
      <div class="img">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          accept=".jpg, .jpeg, .png, .JPG, .JPEG"
        >
          <img v-if="this.user.avatar" :src="this.user.avatar" />
        </el-upload>
      </div>
      <div class="name">
        <span>{{user.username}}</span>
      </div>
    </div>
    <div class="botton">
      <!-- 昵称 -->
      <list
        v-if="a"
        :name="`昵称：  ${user.username}`"
        righticon="el-icon-arrow-right"
        leftticon="el-icon-edit-outline"
        @click="a=!a;b=true"
      ></list>
      <div v-else class="change">
        <el-input
          v-model="username"
          class="input"
          :placeholder="user.username"
          clearable
          prefix-icon="el-icon-edit-outline"
          size="medium"
          maxlength="8"
          show-word-limit
        ></el-input>
        <div class="a" @click="changename">
          <i class="el-icon-check"></i>
        </div>
        <div class="b" @click="a=!a">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <!-- 邮箱 -->
      <list :name="`邮箱：  ${user.email}`" leftticon="el-icon-message"></list>
      <!-- 手机号 -->
      <list
        v-if="b"
        :name="`手机：  ${user.phone}`"
        righticon="el-icon-arrow-right"
        leftticon="el-icon-mobile-phone"
        @click="b=!b;a=true"
      ></list>
      <div v-else class="change">
        <el-input
          v-model="phone"
          class="input"
          :placeholder="user.phone"
          clearable
          prefix-icon="el-icon-mobile-phone"
          size="medium"
          maxlength="11"
          show-word-limit
        ></el-input>
        <div class="a">
          <i class="el-icon-check" @click="changephone"></i>
        </div>
        <div class="b" @click="b=!b">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <!-- 生日 -->
      <list
        :name="`生日：  ${user.birthday}`"
        righticon="el-icon-arrow-right"
        leftticon="el-icon-date"
        @click="openPicker"
      ></list>
      <!-- 地址 -->
      <list
        :name="`我的地址：  ${user.address}`"
        righticon="el-icon-arrow-right"
        leftticon="el-icon-location-outline"
      ></list>
      <!-- 密码 -->
      <list :name="`修改密码`" righticon="el-icon-arrow-right" leftticon="el-icon-lock"></list>

      <!-- 日期选项 -->
      <mt-datetime-picker
        ref="picker"
        type="date"
        :startDate="startdate"
        :endDate="enddate"
        @confirm="savedate"
      ></mt-datetime-picker>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
import list from "../components/list.vue";
import top from "../components/top";
import { Message } from "element-ui";
export default {
  name: "userdatas",
  data() {
    return {
      username: "",
      phone: "",
      birthday: "",
      a: true,
      b: true,
      startdate: new Date("1980-1-1"),
      enddate: new Date()
    };
  },
  created() {
    this.init();
  },
  computed: {
    //获取vuex中的当前用户信息
    user() {
      return this.$store.getters.userdatas;
    }
  },

  components: {
    top,
    list
  },
  methods: {
    //日期转换
    dateFmt(val) {
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
      return Y + M + D;
    },
    //判断初始话用户信息数据
    init() {
      if (this.user.phone == null) {
        this.user.phone = "请设置手机号";
      }
      if (this.user.address == null) {
        this.user.address = "请设置地址";
      }
      if (this.user.birthday == null) {
        this.user.birthday = "请设置出生日期";
      }
    },
    //保存修改后的值到vuex中，和修改成功后的弹窗
    save(data) {
      this.$store.dispatch("setuserdata", data.userinfo[0]);
      Toast("修改成功");
      this.init();
    },
    //点击弹出选择日期
    openPicker() {
      this.a = true;
      this.b = true;
      this.$refs.picker.open();
    },
    isphone(phone) {},
    //封装修改用户信息函数
    changeuser(datas) {
      if (datas) {
        let data = {
          id: this.user.id,
          data: datas
        };
        this.$axios.post("/api/changeuser", data).then((res, err) => {
          if (err) {
            throw err;
          }
          this.save(res.data);
        });
      }
    },
    //修改头像
    handleAvatarSuccess(res, file) {
      this.a = true;
      this.b = true;
      Indicator.open();
      this.imageUrl = URL.createObjectURL(file.raw);
      let fd = new FormData(); //给后端发送的formdata内容
      console.log(JSON.stringify(file.raw)+"+++++++++++++++++++++++++++++++++++")
      fd.append("file", file.raw);
      fd.append("id", this.user.id);
      fd.append("img", this.user.avatar);
      var options = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$axios.post("/api/addavatar", fd, options).then((res, err) => {
        if (err) {
          throw err;
        } else {
          Indicator.close();
          this.save(res.data);
        }
      });
    },
    //修改昵称
    changename() {
      if (this.username) {
        let datas = { username: this.username };
        this.changeuser(datas);
        this.a = true;
        return;
      }
      Toast("昵称不能为空");
    },
    //修改手机号
    changephone() {
      let tel = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (this.phone && tel.test(this.phone)) {
        let datas = { phone: this.phone };
        this.changeuser(datas);
        this.b = true;
        return;
      }
      Toast("请输入正确的手机号");
    },
    //修改出生日期
    savedate(e) {
      let date = { birthday: this.dateFmt(e) };
      this.changeuser(date);
    }
  }
};
</script>
<style scoped>
.mid {
  width: 100%;
  height: 240px;
  background: rgba(195, 201, 195, 0.63);
  z-index: 99;
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
  left: 10px;
  bottom: 10px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.botton {
  position: absolute;
  top: 250px;
  width: 100%;
}
.change {
  width: 100%;
  height: 60px;
  background: rgb(251, 252, 249);
  position: relative;
}
.input {
  top: 12px;
  left: 14px;
  width: 72%;
  position: absolute;
}
.a,
.b {
  width: 34px;
  height: 34px;
  background: rgb(253, 253, 253);
  border-radius: 8px;
  border: rgb(207, 205, 205) solid 1px;
}
.a {
  position: absolute;
  right: 10px;
  top: 12px;
}
.b {
  position: absolute;
  right: 50px;
  top: 12px;
}
.a i {
  position: absolute;
  top: 9px;
  right: 9px;
}
.b i {
  position: absolute;
  top: 9px;
  right: 9px;
}
</style>
