const { createProxyMiddleware } = require("http-proxy-middleware");
// CORS 정책 때문에 proxy를 통해서 해결
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000", // target를 Port 5000으로 한다.
      changeOrigin: true,
    })
  );
};
