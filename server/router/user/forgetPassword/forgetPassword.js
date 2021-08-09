const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

router.post("/", (req, res) => {
  console.log("connection server");
  let email = req.body.email;
  let password = req.body.password;
  let query = connection.query(
    "select * from user where email = ?",
    [email],
    (err, rows) => {
      if (err) return res.send(err);
      if (rows) {
        console.log(rows);
        let query = connection.query(
          "update user set password = ? where email = ?",
          [password, email],
          (err, rows) => {
            if (err) return res.send(err);
            return res.status(200).json({ success: true });
          }
        );
      }
    }
  );
});

module.exports = router;
