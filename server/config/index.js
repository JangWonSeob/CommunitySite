const dotenv = require("dotenv");
dotenv.config();

const envfile = {
  PORT: process.env.PORT,
};

module.exports = envfile;
