<template>
  <div class="addpyq">
    <top title="发朋友圈" lefticn="el-icon-back" color="#0288D1"></top>
    <div class="mid">
      <!-- 文字 -->
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea"
      ></el-input>
      <!-- 图片 -->
      <el-upload
        action
        :file-list="filelist"
        multiple
        :on-change="upload"
        list-type="picture-card"
        :on-preview="seephoto"
        :on-remove="delephoto"
        :auto-upload="false"
        :limit="4"
        :on-exceed="err"
        accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
    <div class="btn" @click="addpyq">发送</div>
  </div>
</template>
<script>
import { Toast,Indicator } from 'mint-ui';
import top from "../components/top";
import { constants } from "crypto";
export default {
  name: "addpyq",
  computed: {
    //获取vuex中的当前用户信息
    user() {
      return this.$store.getters.userdatas;
    }
  },
  components: {
    top
  },
  data() {
    return {
      textarea: "",
      dialogImageUrl: "",
      dialogVisible: false,
      filelist: []
    };
  },
  methods: {
    //删除图片
    delephoto(file, fileList) {
      this.filelist = fileList;
    },
    //查看图片
    seephoto(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    upload(file, filelist) {
      this.filelist = filelist;
    },
    //发朋友圈
    addpyq(){
      if(this.filelist.length>0){
        this.add();
      }else if(this.textarea){
        this.add()
      }else{
        Toast('不能为空');
      return
      }
    },
    add() {
      Indicator.open();
      let fd = new FormData();
      fd.append("id", this.user.id);
      fd.append("text", this.textarea);
      fd.append("avatar",this.user.avatar);
      fd.append("username",this.user.username)
      for (let file of this.filelist) {
        fd.append("file", file.raw);
      }
      var options = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$axios.post("/api/addpyq", fd, options).then((res,err) => {
        if(err){throw err}
        Indicator.close();
        Toast('发布成功');
      this.$router.go(-1)
      });
    },
    //超出图片数量范围执行的函数
    err(files, fileList) {
      Toast('图片过多');
    }
  }
};
</script>
<style scoped>
.mid {
  position: relative;
  width: 100%;
  top: 60px;
}
.btn {
  width: 70%;
  height: 46px;
  background: #0288D1;
  text-align: center;
  color: white;
  font-size: 20px;
  line-height: 44px;
  position: fixed;
  bottom: 20px;
  left: 56px;
  border-radius: 10px;
}
</style>