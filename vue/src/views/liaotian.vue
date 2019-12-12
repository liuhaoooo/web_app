<template>
  <div class="liaotian">
    <leftdrawer title="首页"></leftdrawer>
    <div class="mid">
      
    </div>
  </div>
</template>
<script>
import leftdrawer from "../components/leftdrawer.vue";
import list from "../components/list.vue";
export default {
  name: "liaotian",
  components: {
    leftdrawer,
    list
  },
  computed: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.mid {
  position: relative;
  width: 100%;
  top: 50px;
}
</style>