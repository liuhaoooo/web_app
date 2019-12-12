<template>
  <div class="home">
    <router-view></router-view>
    <div class="tab"><Tabar :datas="datas"></Tabar></div>
  </div>
</template>

<script>
import Tabar from "../components/tabar.vue";
import jwtdecode from "jwt-decode";
export default {
  name: "home",
  components: {
    Tabar
  },
  data() {
    return {
      datas: [
        { path: "/liaotian", icon: "el-icon-chat-dot-square", title: "聊天" },
        { path: "/tongxunlu", icon: "el-icon-user", title: "通讯录" },
        { path: "/faxian", icon: "el-icon-discover", title: "发现" },
        { path: "/me", icon: "el-icon-house", title: "我的" }
      ]
    }
  },
  created() {
    if (localStorage.usertoken) {
      let id = jwtdecode(localStorage.usertoken).id;
      this.$axios.post('/api/getuserinfo',{id:id}).then((res,err)=>{
        if(err){throw err}
        else if(res.data){
          this.$store.dispatch("setuserdata", res.data[0]);
        }
       return 
      })
       
    }
  }
};
</script>
<style scoped>
  .tab{
    position: fixed
  }
</style>
