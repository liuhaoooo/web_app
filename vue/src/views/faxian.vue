<template>
  <div class="faxian">
    <leftdrawer title="发现"></leftdrawer>
    <div class="mid">
      <list name="朋友圈" righticon="el-icon-arrow-right" leftticon="el-icon-share" @click="topyq"></list>
      <list name="看点" righticon="el-icon-arrow-right" leftticon="el-icon-view"></list>
      <list name="排行" righticon="el-icon-arrow-right" leftticon="el-icon-s-data"></list>
      <list name="设置" righticon="el-icon-arrow-right" leftticon="el-icon-s-tools"></list>
    </div>
  </div>
</template>
<script>
import list from "../components/list.vue";
import leftdrawer from "../components/leftdrawer.vue";
export default {
  name: "faxian",
  data() {
    return {
      drawer: false
    };
  },
  components: {
    list,
    leftdrawer
  },
  methods: {
    topyq() {
      this.$router.push("/pyq");
    }
  }
};
</script>
<style scoped>
.mid {
  position: relative;
  width: 100%;
  top: 50px;
}
</style>