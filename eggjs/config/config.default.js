'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1565098876466_4622';

  config.middleware = [];

  const userConfig = {
  };
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'database',
    },
    app: true,
    agent: false,
  };
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [
      "http://localhost:8848"
    ]
  };

  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: ['packet'],
      }
    }
  };
  config.multipart = {
    fileSize: '50mb'
  };
  return {
    ...config,
    ...userConfig
  };
};


