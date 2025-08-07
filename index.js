const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
  target: 'https://shellshock.io',
  changeOrigin: true,
  ws: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Origin', 'https://shellshock.io');
    proxyReq.setHeader('Referer', 'https://shellshock.io/');
    proxyReq.setHeader('User-Agent', req.headers['user-agent'] || 'Mozilla/5.0');
  },
  pathRewrite: { '^/': '/' },
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});
