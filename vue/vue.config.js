module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8848,
    https: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://localhost:7001/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
