<template>
  <div class="zhuce">
    <top title="注册" lefticn="el-icon-back" color="#0288D1"></top>
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
        <el-form-item prop="name">
          <el-input v-model="data.name" prefix-icon="el-icon-user" placeholder="请输入昵称"></el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input v-model="data.email" prefix-icon="el-icon-message" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="data.pass"
            auto-complete="off"
            prefix-icon="el-icon-unlock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="data.checkPass"
            auto-complete="off"
            prefix-icon="el-icon-unlock"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div class="btn" @click="submitForm('data')">注册</div>
          <div class="btn1" @click="resetForm('data')">重置</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import top from "../components/top.vue";
import { Toast } from "mint-ui";
import { Message } from "element-ui";
export default {
  name: "zhuce",
  components: {
    top
  },
  data() {
    var checkName = (rule, value, callback) => {
      //检查昵称
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
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
      //检查密码
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 15) {
        callback(new Error("密码长度不能小于6位或大于15位"));
      } else if (this.data.checkPass !== "") {
        this.$refs.data.validateField("checkPass");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      //检查确认密码密码
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.data.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      data: {
        pass: "",
        checkPass: "",
        name: "",
        email: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      //提交
      var datas = {
        username: this.data.name,
        email: this.data.email,
        password: this.data.pass
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/add", datas).then((res, err) => {
            if (err) {
              throw err;
            } else if (res.data.success) {
              Toast("注册成功");
              this.$router.push("/login");
            } else {
              this.$message({
                message: res.data.msg,
                showClose: true,
                type: "error"
              });
            }
          });
        } else {
          Toast("请填写完整");
          return false;
        }
      });
    },
    resetForm(formName) {
      //重置form
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.zhuce {
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
  height: 40px;
  background: #0288D1;
  text-align: center;
  color: white;
  font-size: 20px;
  line-height: 40px;
  border-radius: 10px;
  margin-left: 15%;
  margin-top: 20px
}
.btn1 {
  width: 70%;
  height: 40px;
  background: rgb(250, 251, 252);
  text-align: center;
  color: rgb(156, 153, 153);
  font-size: 20px;
  line-height: 40px;
  border-radius: 10px;
  margin-left: 15%;
  margin-top: 20px;
  border:rgb(204, 203, 203) solid 1px
}
</style>
