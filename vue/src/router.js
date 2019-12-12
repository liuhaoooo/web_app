import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {//主界面
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/liaotian',
      children: [
        {
          path: '/liaotian',
          name: 'liaotian',
          component: () => import('./views/liaotian.vue')
        },
        {
          path: '/tongxunlu',
          name: 'tongxunlu',
          component: () => import('./views/tongxunlu.vue')
        },
        {
          path: '/faxian',
          name: 'faxian',
          component: () => import('./views/faxian.vue')
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('./views/me.vue')
        }
      ]

    },
    {//登录
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {//注册
      path: '/zhuce',
      name: 'zhuce',
      component: () => import('./views/zhuce.vue')
    },
    {//通讯录好友详细信息
      path: '/userinfo',
      name: 'userinfo',
      component: () => import('./views/userinfo.vue')
    },
    {//聊天界面
      path: '/chat',
      name: 'chat',
      component: () => import('./views/chat.vue')
    },
    {//朋友圈展示
      path: '/pyq',
      name: 'pyq',
      component: () => import('./views/pyq.vue')
    },
    {//添加朋友圈
      path: '/addpyq',
      name: 'addpyq',
      component: () => import('./views/addpyq.vue')
    },
    {//我的资料
      path: '/userdatas',
      name: 'userdatas',
      component: () => import('./views/userdatas.vue')
    },
    {//添加地址
      path: '/addaddress',
      name: 'addaddress',
      component: () => import('./views/addaddress.vue')
    }
  ]
})
//路由守卫
router.beforeEach((to, from, next) => {
  const istoken = localStorage.usertoken ? true : false;
  if (to.path == '/login' || to.path == '/zhuce') {
    next();
  }
  else {
    istoken ? next() : next('/login');
  }
})
export default router;