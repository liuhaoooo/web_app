const jwt = require("jsonwebtoken");
module.exports = (option, app) => {
    return async function jwttoken(ctx, next) {
        if (ctx.header.authorization) {
            let token = ctx.header.authorization
            let istoken = await jwt.verify(token, 'hahaha',(err,res)=>{
                if(err){
                    return false
                }else{
                    return true
                }
            }); 
            if(istoken){
                await next()
            }else{
                ctx.body = {statu:401}
            }
            
        } else {
            ctx.body = { msg: '请先登录' }
        }

    }
}