const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../../../config/index");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
  KakaoStrategy = require("passport-kakao").Strategy,
  NaverStrategy = require("passport-naver").Strategy,
  FacebookStrategy = require("passport-facebook").Strategy;

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
  // console.log("serializeUser", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // console.log("deserializeUser", user.email);
  let email = user.email;
  let query = connection.query(
    "select * from user where email=?",
    [email],
    (err, user) => {
      // console.log("desc : ", user);
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
                return done(null, {
                  loginSuccess: true,
                  id: rows[0].id,
                  email: rows[0].email,
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
    console.log("user : ", user);
    console.log("info : ", info);
    if (err) res.status(500).json(err);
    if (!user) {
      res.redirect("http://localhost:3000/login");
    }
    req.logIn(user, (err) => {
      console.log("user : ", user);
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

// Google Login

let googleCinet = require("../../../config/google.json");

passport.use(
  new GoogleStrategy(
    {
      clientID: googleCinet.web.client_id,
      clientSecret: googleCinet.web.client_secret,
      callbackURL: googleCinet.web.redirect_uris[0],
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      let id = Math.random().toString(36).slice(2);
      let email = profile.emails[0].value;
      let name = profile.displayName;
      let googleId = profile.id;
      let query = connection.query(
        "select * from user where email = ?",
        [email],
        (err, rows) => {
          if (err) throw err;
          if (rows.length) {
            return done(null, {
              loginSuccess: true,
              id: rows[0].id,
              email,
              name: rows[0].name,
              role: rows[0].role,
            });
          } else {
            let sql = {
              id,
              email,
              name,
              googleId,
            };
            let query = connection.query(
              "insert into user set ?",
              [sql],
              (err, rows) => {
                if (err) throw err;
                let query = connection.query(
                  "select * from user where email = ?",
                  [email],
                  (err, rows) => {
                    if (err) throw err;
                    if (rows.length) {
                      return done(null, {
                        loginSuccess: true,
                        id: rows[0].id,
                        email,
                        name: rows[0].name,
                        role: rows[0].role,
                      });
                    }
                  }
                );
              }
            );
          }
        }
      );
    }
  )
);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/");
  }
);

// Kakao Login

let kakaoCinet = require("../../../config/kakao.json");

passport.use(
  new KakaoStrategy(
    {
      clientID: kakaoCinet.web.client_id,
      callbackURL: kakaoCinet.web.redirect_uris[0],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("KakaoStrategy : ", profile);
      console.log("KakaoStrategy id : ", profile._json.id);
      done(null, profile);
    }
  )
);

router.get("/auth/kakao", passport.authenticate("kakao"));

router.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/");
  }
);

// Naver Login

let naverCinet = require("../../../config/naver.json");

passport.use(
  new NaverStrategy(
    {
      clientID: naverCinet.web.client_id,
      clientSecret: naverCinet.web.client_secret,
      callbackURL: naverCinet.web.redirect_uris[0],
      authType: "reauthenticate",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("NaverStrategy : ", profile);
      let id = Math.random().toString(36).slice(2);
      let naverData = profile._json;
      let naverId = naverData.id;
      let name = naverData.nickname;
      let email = naverData.email;
      console.log("NaverStrategy : ", naverId, "/", name, "/", email);
      let query = connection.query(
        "select * from user where email = ?",
        [email],
        (err, rows) => {
          if (err) throw err;
          if (rows.length) {
            return done(null, {
              loginSuccess: true,
              id: rows[0].id,
              email,
              name: rows[0].name,
              role: rows[0].role,
            });
          } else {
            let sql = {
              id,
              email,
              name,
              naverId,
            };
            let query = connection.query(
              "insert into user set ?",
              [sql],
              (err, rows) => {
                if (err) throw err;
                let query = connection.query(
                  "select * from user where email = ?",
                  [email],
                  (err, rows) => {
                    if (err) throw err;
                    if (rows.length) {
                      return done(null, {
                        loginSuccess: true,
                        id: rows[0].id,
                        email,
                        name: rows[0].name,
                        role: rows[0].role,
                      });
                    }
                  }
                );
              }
            );
          }
        }
      );
    }
  )
);
router.get("/auth/naver", passport.authenticate("naver"));

router.get(
  "/auth/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/");
  }
);

// Facebook Login

let facebookCinet = require("../../../config/facebook.json");
console.log("facebookCinet: ", facebookCinet);
passport.use(
  new FacebookStrategy(
    {
      clientID: facebookCinet.client_id,
      clientSecret: facebookCinet.client_secret,
      callbackURL: facebookCinet.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("FacebookStrategy : ", profile);
    }
  )
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    authType: "rerequest",
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/");
  }
);

module.exports = router;
