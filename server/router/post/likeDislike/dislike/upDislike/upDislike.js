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
  console.log("upDislike data : ", req.body);
  let userId = req.session.passport.user.id;

  if (req.body.postId) {
    // post에 대한 싫어요를 추가합니다.
    let postId = req.body.postId;
    let sql = {
      postId,
      userId,
    };
    let query = connection.query(
      "insert into postDislike set ?",
      sql,
      (err, dislikeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        // 좋아요 정보가 있는지 확인한다.
        let query = connection.query(
          "select * from postLike where postId = ? and userId = ?",
          [postId, userId],
          (err, result) => {
            if (err) return res.status(400).json({ success: false, err });
            if (result.length) {
              // 좋아요가 존재한다면 좋아요를 내려준다.
              let query = connection.query(
                "delete from postLike where postId = ? and userId = ?",
                [postId, userId],
                (err, likeResult) => {
                  if (err) return res.status(400).json({ success: false, err });
                  return res.status(200).json({ success: true });
                }
              );
            } else {
              return res.status(200).json({ success: true });
            }
          }
        );
      }
    );
  } else {
    // comment에 대한 싫어요를 추가합니다.
    let commentId = req.body.commentId;
    let sql = {
      commentId,
      userId,
    };
    let query = connection.query(
      "insert into postDislike set ?",
      sql,
      (err, dislikeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        // 좋아요 정보가 있는지 확인한다.
        let query = connection.query(
          "select * from postLike where commentId = ? and userId = ?",
          [commentId, userId],
          (err, result) => {
            if (err) return res.status(400).json({ success: false, err });
            if (result.length) {
              // 좋아요가 존재한다면 좋아요를 내려준다.
              let query = connection.query(
                "delete from postLike where commentId = ? and userId = ?",
                [commentId, userId],
                (err, likeResult) => {
                  if (err) return res.status(400).json({ success: false, err });
                  return res.status(200).json({ success: true });
                }
              );
            } else {
              return res.status(200).json({ success: true });
            }
          }
        );
      }
    );
  }
});

module.exports = router;
