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
  dateStrings: "date", // 날짜 strgin형태로 표현한다.(이쁘게 만들기)
};

const connection = mysql.createConnection(Options);

connection.connect();

router.post("/", (req, res) => {
  console.log("server search : ", req.body);
  let Category = req.body.Category;
  let Search = req.body.Search;
  if (Category === "전체") {
    console.log(1);
    let query = connection.query(
      "select * from post where writer = ? OR title = ?",
      [Search, Search],
      (err, result) => {
        if (err) return res.send(err);
        console.log("post result11 : ", result);
        if (result.length) {
          return res.status(200).json({ search: true, result });
        }
        return res.json({ search: false, message: "검색 결과가 없습니다." });
      }
    );
  } else if (Category === "제목") {
    console.log(2);
    let query = connection.query(
      "select * from post where title = ?",
      [Search],
      (err, result) => {
        if (err) return res.send(err);
        console.log("post result22 : ", result);
        if (result.length) {
          return res.status(200).json({ search: true, result });
        }
        return res.json({ search: false, message: "검색 결과가 없습니다." });
      }
    );
  } else {
    console.log(3);
    let query = connection.query(
      "select * from post where writer = ?",
      [Search],
      (err, result) => {
        if (err) return res.send(err);
        console.log("post result33 : ", result);
        if (result.length) {
          return res.status(200).json({ search: true, result });
        }
        return res.json({ search: false, message: "검색 결과가 없습니다." });
      }
    );
  }
});

module.exports = router;
