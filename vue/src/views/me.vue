<template>
  <div class="me">
    <leftdrawer title="我的"></leftdrawer>
    <div class="mid">
      <list name="通用" righticon="el-icon-arrow-right" leftticon="el-icon-open"></list>
      <list name="商城" righticon="el-icon-arrow-right" leftticon="el-icon-camera-solid"></list>
      <list name="资讯" righticon="el-icon-arrow-right" leftticon="el-icon-warning"></list>
    </div>
  </div>
</template>
<script>
import leftdrawer from "../components/leftdrawer.vue";
import list from "@/components/list.vue";
export default {
  name: "me",
  components: {
    leftdrawer,
    list
  }
};
</script>
<style coped>
.mid {
  position: relative;
  width: 100%;
  top: 50px;
}

</style>