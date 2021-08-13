const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const config = require("../../../../config/index");
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
  // Client에서 정보를 받는다.
  let postId = req.body.postNumber;
  let userId = req.session.passport.user.id;
  let sql = {
    postNumber: postId,
    userId,
  };
  // 받은 정보를 토대로 데이터베이스에 저장합니다.
  let query = connection.query(
    "insert into postLike set ?",
    sql,
    (err, rows) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
