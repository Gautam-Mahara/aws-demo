// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://public.opendatasoft.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove '/api' from the path
      },
    })
  );
};
