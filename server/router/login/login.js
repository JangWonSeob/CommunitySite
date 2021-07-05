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
  res.sendFile(path.join(__dirname + "/../../public/login.html"));
});

router.post("/", (req, res) => {
  let email = req.body.email;
  console.log(email);
  let responseData = {};

  let query = connection.query(
    "select name from user where email=?",
    [email],
    (err, rows) => {
      if (err) throw err;
      if (rows.length) {
        console.log("already used email");
        responseData.result = "ok";
        responseData.name = rows[0].name;
        console.log(rows);
      } else {
        responseData.result = "none";
        responseData.name = "";
        console.log("사용 가능합니다.");
      }
      res.json(responseData); // 콜백 함수가 끝나는 시점에 준다.
    }
  );
});

module.exports = router;
