const express = require("express");
const router = express.Router();
const postDate = require("../../post/utile");

const mysql = require("mysql");

const config = require("../../../config/index");
const { postCount, commentCount, myPagelikeCount } = require("../utile");
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

router.get("/postLength", (req, res) => {
  console.log("myPost server");
  console.log(req.session.passport.user.id);
  let userId = req.session.passport.user.id;
  let query = connection.query(
    "select writer, count(writer) from post where writer = ? group by writer",
    [userId],
    (err, posts) => {
      if (err) return res.send(err);
      console.log(33);
      console.log(posts);
      if (posts.length) {
        // 내가 쓴 게시글 갯수
        let postLength = postCount(posts)[0];
        console.log("postLength : ", postLength);
        return res.status(200).json({ success: true, postLength });
      }
    }
  );
});
router.get("/commentLength", (req, res) => {
  console.log("myPost server");
  console.log(req.session.passport.user.id);
  let userId = req.session.passport.user.id;
  let query = connection.query(
    "select writer, count(writer) from comment where writer = ? group by writer",
    [userId],
    (err, comments) => {
      if (err) return res.json({ err });
      console.log(22);
      if (comments.length) {
        // 내가 쓴 댓글 갯수
        let commentLength = commentCount(comments)[0];
        console.log("commentLength : ", commentLength);
      }
    }
  );
});
router.get("/likeLength", (req, res) => {
  console.log("myPost server");
  console.log(req.session.passport.user.id);
  let userId = req.session.passport.user.id;
  let query = connection.query(
    "select userId, count(userId) from postLike where userId = ? group by userId",
    [userId],
    (err, likes) => {
      if (err) return res.send(err);
      console.log(11);
      console.log(likes);
      if (likes.length) {
        // 내가 좋아요한 갯수
        let likeLength = myPagelikeCount(likes)[0];
        console.log("likeLength : ", likeLength);
        return res.status(200).json({ success: true, likeLength });
      }
    }
  );
});

module.exports = router;
