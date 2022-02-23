const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config");
const server = require("http").createServer(app);

const connect = (url) => {
  return mongoose.connect(url, config.db.options);
};
server.listen(config.port, () =>
  console.log("server running on port:" + config.port)
);
// app.listen(config.port);
connect(config.db.prod);
mongoose.connection.on("error", console.log);

module.exports = server;
