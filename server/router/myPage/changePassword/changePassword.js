const express = require("express");
const router = express.Router();
const passHash = require("../../user/utile");

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

router.post("/", (req, res) => {
  let userId = req.session.passport.user.id;
  console.log("userId : ", userId);
  let userDate = req.body;
  let password = userDate.NowPassword;
  let newPassword = userDate.NewPassword;
  let hashpw = passHash(password);
  let newHashpw = passHash(newPassword);
  let query = connection.query(
    "select * from user where id = ?",
    [userId],
    (err, rows) => {
      if (err) return res.send(err);
      if (rows.length) {
        console.log(rows);
        console.log(
          "change Password server : ",
          rows[0].password,
          hashpw,
          rows[0].password === hashpw
        );
        if (rows[0].password === hashpw) {
          let query = connection.query(
            "Update user set password = ? where id = ?",
            [newHashpw, userId],
            (err, rows) => {
              if (err) return res.send(err);
              return res.status(200).json({ success: true });
            }
          );
        } else {
          return res.json({
            success: false,
            message: "기존 비밀번호를 확인해주세요",
          });
        }
      }
    }
  );
});

module.exports = router;
