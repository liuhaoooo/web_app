import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from './http'
import mdui from 'mdui'
import VueScroller from 'vue-scroller'



//socketio
// import VueSocketIO from 'vue-socket.io';
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:7001/',
//   options: {} 
// }))

Vue.use(MintUI)
Vue.use(VueScroller)
Vue.use(mdui);
Vue.use(ElementUI)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
