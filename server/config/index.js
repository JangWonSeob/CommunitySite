const dotenv = require("dotenv");
dotenv.config();

const envfile = {
  PORT: process.env.PORT,
  DBPW: process.env.DBPW,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

module.exports = envfile;
