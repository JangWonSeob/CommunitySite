const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
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

// router.get("/", (req, res) => {
//   let errMsg = req.flash("error"); //로그인 과정에서 발생한 message 사용가능
//   console.log(errMsg);
//   let msg = "";
//   if (errMsg) {
//     msg = errMsg;
//   }
//   res.json({ message: msg });
//   console.log("msg : ", msg);
//   console.log("req.session : ", req.session);
// });

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
    function (email, password, done) {
      console.log("LocalStrategy", email, password);
      let query = connection.query(
        "select * from user where email=?",
        [email],
        (err, rows) => {
          if (err) throw err;
          if (rows.length) {
            console.log(rows);
            if (email === rows[0].email) {
              if (password === rows[0].password) {
                return done(null, rows[0], {
                  loginSuccess: true,
                  id: rows[0].id,
                  email,
                  name: rows[0].name,
                  role: rows[0].role,
                });
              } else {
                return done(null, false, { loginSuccess: false });
              }
            }
          } else {
            return done(null, false, { loginSuccess: false });
          }
        }
      );
    }
  )
);

router.post("/", (req, res, next) => {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) res.status(500).json(err);
    if (user) {
      return (
        (req.session.user = info),
        (req.session.loginSuccess = true),
        //console.log("req.session : ", req.session),
        res.status(200).json(info, req.session.user, req.session.loginSuccess)
      );
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

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
