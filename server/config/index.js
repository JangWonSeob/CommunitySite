const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DBHOST: process.env.DBHOST,
  DBPOST: process.env.DBPOST,
  DBPW: process.env.DBPW,
  SESSION_SECRET: process.env.SESSION_SECRET,
  AUTH_EMAIL: process.env.AUTH_EMAIL,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD,
};
