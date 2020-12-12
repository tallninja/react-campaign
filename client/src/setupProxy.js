const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/auth", "/billing"],
    createProxyMiddleware({
      // target: "http://localhost:5000",
      target: "http://campaign_server_1:5000", // since i'm using docker containers do localhost wont work here
    })
  );
};
