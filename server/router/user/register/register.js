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

const updatapw = (req, res) => {};

router.post("/", (req, res, next) => {
  console.log("reqBack : ", req);
  let id = Math.random().toString(36).slice(2);
  console.log("id : ", id);
  let user = req.body;
  let email = user.email;
  let name = user.name;
  let password = user.password;
  console.log("useremail", email);
  let query = connection.query(
    "select * from user where email=?",
    [email],
    (err, rows) => {
      if (err) return res.json({ success: false, err });
      if (rows.length) {
        console.log("rows.length", rows.length);
        if (rows[0].email === email) {
          console.log("already user");
        } else if (rows[0].name === name) {
          console.log("already user name");
        }
      } else {
        let sql = {
          id,
          email,
          name,
          password,
        };
        let query = connection.query(
          "insert into user set ?",
          sql,
          (err, rows) => {
            if (err) throw err;
            console.log("insert DB data: ", rows.insertId, name);
            if (rows) {
              res.status(200).json({ success: true });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
