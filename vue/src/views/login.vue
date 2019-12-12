<template>
  <div class="login">
    <top title="登录" lefticn="el-icon" color="#0288D1"></top>
    <div class="from">
      <el-form
        :model="data"
        status-icon
        :rules="rules2"
        ref="data"
        label-width="100px"
        class="demo-ruleForm"
        size="medium"
        label-position="top"
      >
        <el-form-item label prop="email">
          <el-input v-model="data.email" prefix-icon="el-icon-mobile-phone" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label prop="password">
          <el-input
            type="password"
            v-model="data.password"
            auto-complete="off"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="btn" @click="submitForm('data')">登录</div>
        </el-form-item>
      </el-form>
      <div class="tozhuce" @click="$router.push('/zhuce')">|  没有账户？去注册  |</div>
    </div>
  </div>
</template>

<script>
import top from "../components/top.vue";
import jwtdecode from "jwt-decode";
import { Message } from "element-ui";
import { Toast, Indicator } from "mint-ui";
export default {
  name: "login",
  components: {
    top
  },
  data() {
    var checkEmail = (rule, value, callback) => {
      //检查邮箱
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (!reg.test(value)) {
          return callback(new Error("邮箱不合法"));
        }
        setTimeout(() => {
          callback();
        }, 1000);
      }
    };
    var validatePass = (rule, value, callback) => {
      //检查密码1
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.data.checkPass !== "") {
          this.$refs.data.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      data: {
        email: "",
        password: ""
      },
      rules2: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Indicator.open({
            text: "登录中...",
            spinnerType: "fading-circle"
          });
          this.$axios.post("/api/login", this.data).then((res, err) => {
            if (err) {
              throw err;
            } else if (res.data.success) {
              Indicator.close();
              Toast({
                message: "登录成功",
                iconClass: "icon icon-success"
              });
              localStorage.setItem("usertoken", res.data.token);
              //将token解析存储到vuex
              let userdatas = jwtdecode(res.data.token);
              this.$store.dispatch("setuserdata", userdatas);
              this.$router.push("/");
            } else {
              Indicator.close();
              Toast({
                message: res.data.msg,
                iconClass: "icon icon-error"
              });
            }
          });
        } else {
          Indicator.close();
          Toast({
            message: "请填写完整",
            iconClass: "icon icon-error"
          });
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.back {
  height: 30px;
  width: 40px;
}
.back span {
  text-align: center;
  color: black;
}
.from {
  position: absolute;
  top: 160px;
  width: 80%;
  left: 10%;
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
  margin-left: 15%;
  margin-top: 20px;
}
.tozhuce{
  position: fixed;
  bottom: 20px;
  left: 35%;
  color: #666
}
</style>
