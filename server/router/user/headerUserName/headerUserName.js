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
  console.log("header server");
  let id = req.body.userId;
  console.log("header id : ", id);
  let query = connection.query(
    "select name, email from user where id = ?",
    [id],
    (err, rows) => {
      console.log("rows header 111 : ", rows);
      if (err) return res.send(err);
      if (rows.length) {
        console.log("rows header  222 : ", rows);
        return res.status(200).json({ success: true, rows });
      }
    }
  );
});

module.exports = router;
