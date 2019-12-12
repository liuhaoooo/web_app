<template>
  <div class="mdui-bottom-nav-fixed">
    <div
      class="mdui-bottom-nav mdui-bottom-nav-text-auto mdui-color-light-blue-700"
    >
      <router-link
        v-for="(data,index) in datas"
        :key="index"
        :to="data.path"
        active-class="mdui-bottom-nav-active"
      >
        <i :class="`mdui-icon ${data.icon}`"></i>
        <label>{{data.title}}</label>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabar",
  props: {
    datas: Array
  }
};
</script>
<style scoped>
  
</style>
