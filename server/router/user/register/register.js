const express = require("express");
const router = express.Router();
const passHash = require("../utile");

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

router.post("/", (req, res, next) => {
  let id = Math.random().toString(36).slice(2);
  let user = req.body;
  let email = user.email;
  let name = user.name;
  let password = user.password;
  let hashpw = passHash(password);
  let query = connection.query(
    "select * from user where email= ? or name = ?",
    [email, name],
    (err, rows) => {
      if (err) return res.json({ success: false, err });
      if (rows.length) {
        if (
          (rows[0].name === name || rows[1].name === name) &&
          (rows[0].email === email || rows[1].email === email)
        ) {
          console.log("already user email and name");
          return res.json({
            error: "일치하는 이메일과 아이디가 있습니다.",
          });
        } else if (rows[0].name === name || rows[1].name === name) {
          console.log("already user name");
          return res.json({ error: "이미 존재하는 아이디입니다." });
        } else if (rows[0].email === email || rows[1].email === email) {
          console.log("already user emailx");
          return res.json({ error: "일치하는 이메일이 있습니다." });
        }
      } else {
        let sql = {
          id,
          email,
          name,
          password: hashpw,
        };
        let query = connection.query(
          "insert into user set ?",
          sql,
          (err, rows) => {
            if (err) throw err;
            console.log("insert DB data");
            if (rows) {
              res.status(200).json({ success: true });
            }
          }
        );
      }
    }
  );
  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   if (err) throw err;
  //   bcrypt.hash(password, salt, function (err, hash) {
  //     if (err) throw err;
  //     password = hash;
  //   });
  //   console.log("hash password 111 : ", password);
  // });
});

module.exports = router;
