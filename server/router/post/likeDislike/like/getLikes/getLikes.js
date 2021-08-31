const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const config = require("../../../../../config/index");
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
  console.log("like data : ", req.body);

  if (req.body.postId) {
    // post에 대한 좋아요 정보를 검색합니다.
    let postId = req.body.postId;
    let query = connection.query(
      "select * from postLike where postId = ?",
      [postId],
      (err, likes) => {
        if (err) return res.status(400).send(err);
        if (likes.length) {
          // 좋아요 정보가 있다면
          if (req.session.passport) {
            // Session에 로그인 정보가 있다면, userId를 보내줍니다.
            let userId = req.session.passport.user.id;
            return res
              .status(200)
              .json({ success: true, likes, logining: true, userId });
          } else {
            return res
              .status(200)
              .json({ success: true, likes, logining: false });
          }
        } else {
          // 좋아요 정보가 없다면
          if (req.session.passport) {
            console.log(1111111);
            // Session에 로그인 정보가 있다면, userId를 보내줍니다.
            let userId = req.session.passport.user.id;
            return res.status(200).json({ success: true, logining: true });
          } else {
            return res.status(200).json({ success: true, logining: false });
          }
        }
      }
    );
  } else {
    // comment에 대한 좋아요 정보를 검색합니다.
    let commentId = req.body.commentId;
    let query = connection.query(
      "select * from postLike where commentId = ?",
      [commentId],
      (err, likes) => {
        if (err) return res.status(400).send(err);
        if (likes.length) {
          // 좋아요 정보가 있다면
          if (req.session.passport) {
            // Session에 로그인 정보가 있다면, userId를 보내줍니다.
            let userId = req.session.passport.user.id;
            return res
              .status(200)
              .json({ success: true, likes, logining: true, userId });
          } else {
            return res
              .status(200)
              .json({ success: true, likes, logining: false });
          }
        } else {
          // 좋아요 정보가 없다면
          if (req.session.passport) {
            // Session에 로그인 정보가 있다면, userId를 보내줍니다.
            let userId = req.session.passport.user.id;
            return res.status(200).json({ success: true, logining: true });
          } else {
            return res.status(200).json({ success: true, logining: false });
          }
        }
      }
    );
  }
});

module.exports = router;
