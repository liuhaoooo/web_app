'use strict';
const Controller = require('egg').Controller,
    fs = require('fs'),
    path = require('path'),
    awaitWriteStream = require('await-stream-ready').write,
    sendToWormhole = require('stream-wormhole');

class MsgController extends Controller {
    async addmsg() {
        const { ctx } = this;
        const { msg, who, userid, friendid } = ctx.request.body;
        const msgs = {//传入的数据
            msg,
            who,
            userid,
            friendid,
            time: new Date()
        }
        await this.service.msg.addmsg(msgs)
    }

    async addpyq() {//上传朋友圈数据
        const { ctx } = this;
        const parts = ctx.multipart({ autoFields: true });//多个文件流
        let stream;
        let urls = [];
        while ((stream = await parts()) != null) {
            if (stream.length) {
            } else if (!stream.filename) {
                continue
            } else {
                let name = Math.random() * 1000
                let target = path.join(this.config.baseDir, `app/public/img/${name + stream.filename}`);//创建路径
                const file = fs.createWriteStream(target);//创建可写流
                try {
                    await awaitWriteStream(stream.pipe(file));//将文件流写入file
                } catch (err) {
                    await sendToWormhole(stream);//出错关闭管道
                    throw err
                }
                urls.push(`http://127.0.0.1:7001/public/img/${name + stream.filename}`)
            }
        }
        let data = {//需要存入数据库的数据
            text: parts.field.text,
            img: JSON.stringify(urls),
            time: new Date(),
            userid: parts.field.id,
            avatar: parts.field.avatar,
            username: parts.field.username
        }
        await this.service.msg.addpyq(data)
        ctx.status = 200;
        ctx.body = { msg: '发布成功' }
    }

    async getpyq() {//获取朋友圈信息
        const { ctx } = this;
        let datas = await this.service.msg.getpyq(ctx.request.body.offset);
        ctx.status = 200;
        ctx.body = datas
    }
}

module.exports = MsgController;