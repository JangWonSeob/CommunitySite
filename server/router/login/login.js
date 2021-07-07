const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql");
const config = require("../../config/index");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const { runInContext } = require("vm");

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
  let errMsg = req.flash("error"); //로그인 과정에서 발생한 message 사용가능
  console.log(errMsg);
  let msg = "";
  if (errMsg) {
    msg = errMsg;
  }
  res.sendFile(path.join(__dirname + "/../../../client/public/login.html"));
});

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

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username, password, done) => {
      console.log("LocalStrategy", username, password);
      let query = connection.query(
        "select * from user where email=?",
        [username],
        (err, rows) => {
          if (err) throw err;
          if (rows.length) {
            if (username === rows[0].email) {
              if (password === rows[0].password) {
                return done(null, rows[0]);
              } else {
                return done(null, false, { message: "Incorrect password." });
              }
            }
          } else {
            return done(null, false, { message: "Incorrect username." });
          }
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

/*
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
            // session저장이 끝나면 홈화면으로 이동(세션 저장 전에 홈화면으로 이동하여 세션을 사용하지 못하는 것 방지)
            res.redirect("/");
          });
        } else if (rows[0].email === email) {
          if (rows[0].password !== password) {
            //req.session.loginSuccess = "false";
            res.send("비밀번호가 일치하지 않습니다.");
          }
        }
      } else {
        //req.session.loginSuccess = "false";
        res.send("No user!!");
        responseData.result = "none";
        responseData.name = "";
      }
    }
  );
});
*/
module.exports = router;
