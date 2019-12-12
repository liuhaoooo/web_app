'use strict';

const Controller = require('egg').Controller,
  fs = require('fs'),
  path = require('path'),
  awaitWriteStream = require('await-stream-ready').write,
  sendToWormhole = require('stream-wormhole');

class UserController extends Controller {
   
  async zhuce() {//注册
    const { ctx } = this;
    let res = await this.service.user.zhuce();
    ctx.body = res;
  }
  async login() {//登录
    const { ctx, service } = this;
    let res = await service.user.login(ctx.request.body.email, ctx.request.body.password)
    ctx.body = res;
  }
  async getuserinfo() {//获取用户信息
    const { ctx } = this
    let data = await this.service.user.getuser(ctx.request.body.id)
    ctx.body = data
  }
  async frienddatas() {//通讯列表
    const { ctx, service } = this;
    let friends = await service.user.frienddata()
    ctx.body = friends;
  }
  async addavatar() {//改头像
    const { ctx } = this;
    let stream = await ctx.getFileStream();//获取流
    let name = Math.random() * 10
    let target = path.join(this.config.baseDir, `app/public/avatar/${name + stream.filename}`);//创建路径
    const file = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(file));
    } catch (err) {
      await sendToWormhole(stream);//出错关闭管道
      throw err
    }
    let img = stream.fields.img.split('/').pop()//拿到文件名
    let url = `app/public/avatar/${img}`
    let data = {avatar:`http://127.0.0.1:7001/public/avatar/${name + stream.filename}`}//存入数据库的值
    await this.service.user.changeuser(stream.fields.id, data)//把文件目录存入数据库
    fs.readdir('app/public/avatar', function (error, data) {//查询avatar文件夹的目录
      if (error) {
        throw error
      }
      if ((data.indexOf(img)) == -1) { return }//判断文件夹中是否存在原来的文件
      else {
        fs.unlink(url, function (error) {//在文件夹中删除原来的头像
          if (error)
            throw error;
        })
      };
    })
    let userinfo = await this.service.user.getuser(stream.fields.id)
    this.ctx.body = {
      msg: '修改成功',
      userinfo
    }
    ctx.status = 200;
  }
  async changeuser(){//修改用户信息
    const {ctx} = this;
    let id = ctx.request.body.id
    let data = ctx.request.body.data
    await this.service.user.changeuser(id,data)
    let userinfo = await this.service.user.getuser(id)
    this.ctx.body = {
      msg: '修改成功',
      userinfo
    }
    ctx.status = 200;
  }
}

module.exports = UserController;
