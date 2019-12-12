const room = '';

module.exports = (option, app) => {
  return async (ctx, next) => {
    const { app, socket } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/')
    // console.log(id)
    nsp.adapter.clients(ctx.socket.rooms, (err, clients) => {
      // console.log(clients);
    })

    await next();
    // console.log('disconnection!');
  };
};
