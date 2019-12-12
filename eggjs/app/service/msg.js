'use strict';
const Service = require('egg').Service;
class MsgService extends Service {

  async addmsg(msgs){//存储聊天记录
    if(msgs){
        await this.app.mysql.insert('msg',msgs)
    }
  }
  async addpyq(data){//存储朋友圈信息
    if(data){
      await this.app.mysql.insert('pyq',data)
    }
  }
  async getpyq(offset){//获取朋友圈信息
    const options = {
      orders: [['time','desc']],
      limit: 5, 
      offset: offset,
    };
    let data = await this.app.mysql.select('pyq',options);
    return data
  }
}

module.exports = MsgService;

