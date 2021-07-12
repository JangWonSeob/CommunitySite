const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DBPW: process.env.DBPW,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
