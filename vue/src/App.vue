<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import jwtdecode from "jwt-decode";
export default {
  name: "app",
  created() {
    if (localStorage.usertoken) {
      let id = jwtdecode(localStorage.usertoken).id;
      this.$axios.post('/api/getuserinfo',{id:id}).then((res,err)=>{
        if(res.data[0]){this.$store.dispatch("setuserdata", res.data[0]);}  
      })
       
    }
  }
};
</script>
<style>
</style>
