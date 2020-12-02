const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ target: 'https://fadyattia-4shopping-server.herokuapp.com', changeOrigin: true }))
  // app.use(proxy('/api',{target: 'https://fadyattia-4shopping-server.herokuapp.com',}));
};