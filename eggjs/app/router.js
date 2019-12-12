'use strict';

module.exports = app => {
  const { router, controller, io } = app;
  const jwt = app.middleware.jwt({}, app);
  router.post('/add', controller.user.zhuce);//注册
  router.post('/login', controller.user.login);//登录
  router.post('/getuserinfo',jwt,controller.user.getuserinfo)//获取用户信息
  router.post('/frienddatas',jwt, controller.user.frienddatas)//获取朋友列表
  router.post('/addmsg', jwt,controller.msg.addmsg);//存储聊天记录
  router.post('/addpyq',jwt,controller.msg.addpyq);//发朋友圈
  router.post('/getpyq',jwt,controller.msg.getpyq);//获取朋友圈
  router.post('/addavatar',jwt,controller.user.addavatar);//换头像
  router.post('/changeuser',jwt,controller.user.changeuser);//修改用户信息
  io.of('/').route('chat', io.controller.chat.index);
};
