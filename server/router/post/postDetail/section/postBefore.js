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
  dateStrings: "date", // 날짜 strgin형태로 표현한다.(이쁘게 만들기)
};

const connection = mysql.createConnection(Options);

connection.connect();

router.post("/", (req, res) => {
  // postId 값을 기준으로 이전글의 정보를 불러옵니다.
  let postId = req.body.postId;
  console.log("req.body", postId);
  let query = connection.query(
    "select postId, writer, title, description, category, date, view, name, email, role from post LEFT JOIN user ON post.writer = user.id where postId = (select postId from post where postId < ? order by postId desc limit 1)",
    [postId],
    (err, postBefore) => {
      if (err) return res.send(err);
      if (postBefore.length) {
        console.log("postBefore : ", postBefore);
        return res.status(200).json({ success: true, postBefore });
      } else {
        return res.json({ result: true });
      }
    }
  );
});

module.exports = router;
