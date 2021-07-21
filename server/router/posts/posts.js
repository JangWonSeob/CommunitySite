const express = require("express");
const router = express.Router();

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql1",
  database: "communitysite",
});

connection.connect();

router.get("/", (req, res, next) => {
  console.log("req.session : ", req.session);
  let query = connection.query("select * from post", (err, rows) => {
    if (err) return res.json({ postsSuccess: false, err });
    if (rows.length) {
      return res.json({ postsSuccess: true, rows });
    } else {
    }
  });
});

module.exports = router;