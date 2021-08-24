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
  dateStrings: "date",
};

const connection = mysql.createConnection(Options);

connection.connect();

router.get("/", (req, res) => {
  console.log(req.session.passport.user.id);
  let userId = req.session.passport.user.id;
  let query = connection.query(
    "select name, email, role, createdate, googleId, naverId from user where id = ?",
    [userId],
    (err, user) => {
      if (err) return res.send(err);
      if (user.length) {
        console.log();
        let userData = {
          email: user[0].email,
          name: user[0].name,
          date: user[0].createdate,
        };
        if (user.googleId || user.naverId) {
          console.log("social");
          return res
            .status(200)
            .json({ socialLogin: true, success: true, userData });
        } else {
          console.log("local");
          return res
            .status(200)
            .json({ socialLogin: false, success: true, userData });
        }
      }
    }
  );
});

module.exports = router;
