const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const config = require("../../config/index");

const { DBPW } = config;

const Options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: DBPW,
  database: "communitysite",
};

const connection = mysql.createConnection(Options);

connection.connect();
//console.log("Welcome Mysql Server!!");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../../client/public/login.html"));
});

router.post("/", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  console.log(email);
  let responseData = {};

  let query = connection.query(
    "select name, password, email from user where email=?",
    [email],
    (err, rows) => {
      if (err) throw err;
      if (rows.length) {
        if (rows[0].email === email && rows[0].password === password) {
          responseData.result = "ok";
          console.log("Welcome!!");
          req.session.loginSuccess = "true";
          req.session.name = rows[0].name;
          req.session.save(() => {
            res.redirect("/");
          });
        } else if (rows[0].email === email) {
          if (rows[0].password !== password) {
            req.session.loginSuccess = "false";
            res.send("비밀번호가 일치하지 않습니다.");
          }
        }
      } else {
        req.session.loginSuccess = "false";
        res.send("No user!!");
        responseData.result = "none";
        responseData.name = "";
      }
    }
  );
});

module.exports = router;
