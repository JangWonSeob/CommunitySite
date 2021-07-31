const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const config = require("../../../config/index");
const { DBHOST, DBPOST, DBPW } = config;
const Options = {
  host: DBHOST,
  port: DBPOST,
  user: "root",
  password: DBPW,
  database: "communitysite",
};

const connection = mysql.createConnection(Options);

connection.connect();

router.get("/", (req, res) => {
  // console.log("req.session header Name : ", req.session.passport);
  // console.log("req.session header Name111 : ", req.session.passport.user.name);
  {
    req.session.passport && res.json({ user: req.session.passport.user });
  }
});

module.exports = router;
