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
};

const connection = mysql.createConnection(Options);

connection.connect();

router.post("/", (req, res) => {
  let userId = req.session.passport.user.id;
  console.log("userId : ", userId);
  let userDate = req.body;
  let password = userDate.password;
  let query = connection.query(
    "select * from user where id = ?",
    [userId],
    (err, rows) => {
      if (err) return res.send(err);
      if (rows.length) {
        console.log(rows);
        if (rows[0].password === password) {
          return res.status(200).json({ success: true, userId });
        }
      }
    }
  );
});

module.exports = router;
