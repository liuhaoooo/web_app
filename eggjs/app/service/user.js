'use strict';

const bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken')


const Service = require('egg').Service;

class UserService extends Service {

  async zhuce() {//注册
    const { ctx } = this;
    let user = await this.app.mysql.get('user', { email: ctx.request.body.email });
    if (user) {
      return {
        msg: '邮箱已被注册',
        success: false
      }
    }
    else {
      let getbcrypt = function (pwd) {//加密密码
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(pwd, salt);
        return hash;
      }
      let datas = {
        username:ctx.request.body.username,
        email:ctx.request.body.email,
        avatar:"http://127.0.0.1:7001/public/avatar/default/avatar.jpg",
        password:getbcrypt(ctx.request.body.password)
      }
      await this.app.mysql.insert('user', datas)
      ctx.status = 200;
      return {
        msg: '注册成功',
        success: true
      }
    }
  }

  async login(email1, password) {//登录
    const { ctx } = this;
    let user = await this.app.mysql.get('user', { email: email1 });
    if (!user) {
      return {
        msg: '邮箱不存在',
        success: false
      }
    } else {
      return new Promise((reslove, reject) => {
        bcrypt.compare(password, user.password).then(isMatch => {//匹配密码是否一致
          if (isMatch) {
            let data = this.service.user.settoken(user.id, user.username, user.email, user.avatar)
            reslove(data)
          }
          reslove({
            msg: '密码错误',
            success: false
          })
        })

      })
    }
  }

  async settoken(id, name, email, avatar) {//生成token
    return new Promise((reslove, reject) => {
      const palyload = { id: id, username: name, email: email, avatar: avatar };//定义token规则
      jwt.sign(palyload, 'hahaha', { expiresIn: 1000 }, (err, token) => {//生成token          
        if (err) { reject(err) }
        else {
          reslove({
            msg: '登录成功',
            success: true,
            token: token
          })
        }
      });
    })

  }
  async getuser(id){//获取用户信息
    const {app} = this;
    let userinfo = await app.mysql.select('user',{
      where: {id:id},
      columns: ['avatar', 'username','id','email','birthday','phone','address'],    
    })
    return userinfo;
  }
  async frienddata(){//获取朋友列表
    const {ctx,app} = this;
    let users = await app.mysql.select('user')
    return users;
  }
  async changeuser(id,data){//修改用户信息
    const {app} = this;
    const options = {
      where: {
        id: id
      }
    };
    await app.mysql.update('user',data,options)

  }
}

module.exports = UserService;

