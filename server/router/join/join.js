const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql1",
  database: "communitysite",
});

connection.connect();

//console.log("Welcome Mysql Server!!");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../../client/public/join.html"));
});

router.post("/", (req, res) => {
  let body = req.body;
  let email = body.email;
  let name = body.name;
  let password = body.password;
  console.log(body);

  let sql = { email, name, password };
  let query = connection.query("insert into user set ?", sql, (err, rows) => {
    if (err) throw err;
    console.log();
    console.log("insert DB data: ", rows.insertId, name);
  });
});

module.exports = router;
