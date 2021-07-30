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
  console.log("google data : ", req.body);
  let data = req.body;
  let email = data.email;
  let name = data.name;
  let googleId = data.googleId;
  console.log("google data : ", data, email, name, googleId);
  let query = connection.query(
    "select * from user2 where email = ?",
    [email],
    (err, rows) => {
      if (err) return res.send(err);
      if (rows.lenght) {
        return res.status(200).json({ success: true });
      } else {
        let sql = {
          email,
          name,
          googleId,
        };
        let query = connection.query(
          "insert into user2 set ?",
          sql,
          (err, rows) => {
            console.log("session : ", req.session);
            if (err) return res.send(err);
            if (rows.lenght) {
              req.session.loginSuccess = true;
              console.log("session : ", req.session);
            }
            console.log("session : ", req.session);
            return res.status(200).json({ success: true });
          }
        );
      }
    }
  );
});

module.exports = router;
