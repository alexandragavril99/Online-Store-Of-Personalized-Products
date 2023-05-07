const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname + "\\development.env"),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT || 8081,
};
