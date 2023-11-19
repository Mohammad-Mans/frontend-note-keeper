import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://technotes-api.onrender.com',
      changeOrigin: true,
    })
  );
}
