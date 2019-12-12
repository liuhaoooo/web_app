<template>
  <header class="header" :style="`background-color: ${color}`">
    <div class="header_button" v-if="!lefticn">
      <button @click="$emit('avatarclick')">
        <div class="headerimg">
          <img :src="userinfo.avatar"/>
        </div>
      </button>
    </div>

    <div class="header_button" v-if="lefticn">
      <button @click="$router.go(-1)">
        <i :class="lefticn"></i>
      </button>
    </div>

    <h1 class="title" @click="$emit('titleclick')">{{title}}</h1>

    <div class="header_button" v-show="righticn">
      <button @click="$emit('rightclick')">
        <i :class="righticn"></i>
      </button>
    </div>

    
  </header>
</template>

<script>
export default {
  name: "top",
  props: {
    title: String,
    righticn: String,
    lefticn: String,
    color:String
  },
  computed: {
    userinfo() {
      return this.$store.getters.userdatas;
    }
  }
};
</script>
<style scoped>
.header {
  align-items: center;
  box-sizing: border-box;
  color: rgb(253, 251, 251);
  display: flex;
  font-size: 18px;
  height: 50px;
  line-height: 1;
  padding: 0 10px;
  position: fixed;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.header_button button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  outline: none;
}
.title {
  flex: 1;
  font-size: 18px
}
.headerimg img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
