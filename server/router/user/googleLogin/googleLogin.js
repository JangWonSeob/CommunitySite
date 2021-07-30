const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../../../config/index");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

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

passport.serializeUser(function (user, done) {
  console.log("serializeUser", user.email);
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  console.log("deserializeUser", email);
  let query = connection.query(
    "select * from user where email=?",
    [email],
    (err, user) => {
      done(null, user);
    }
  );
});

router.post("/", (req, res) => {
  let data = req.body;
  let email = data.email;
  let name = data.name;
  let googleId = data.googleId;
  console.log("google data : ", data, email, name, googleId);
  let query = connection.query(
    "select * from user where email = ?",
    [email],
    (err, rows) => {
      if (err) return res.send(err);
      console.log("rows.lenght : ", rows.length);
      if (rows.length) {
        console.log("rows.lenght : ", rows.length);
        return res.status(200).json({ success: true, rows });
      } else {
        let id = Math.random().toString(36).slice(2);
        let sql = {
          id,
          email,
          name,
          googleId,
        };
        let query = connection.query(
          "insert into user set ?",
          sql,
          (err, rows) => {
            if (err) return res.send(err);
            if (rows.lenght) {
              req.session.loginSuccess = true;
            }
            return res.status(200).json({ success: true });
          }
        );
      }
    }
  );
});

module.exports = router;
