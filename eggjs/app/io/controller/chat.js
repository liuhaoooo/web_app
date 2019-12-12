'use strict';

const Controller = require('egg').Controller;
let rooms = [];
const room = 'userroom'
class ChatController extends Controller {
  async index() {
    const { ctx } = this;
    const message = ctx.args[0];

    ctx.socket.join(room, () => {
      // let rooms = Object.keys(ctx.socket.rooms);
      // console.log(rooms);
      ctx.socket.to(room).emit('res',message);
    })
  }
}

module.exports = ChatController;