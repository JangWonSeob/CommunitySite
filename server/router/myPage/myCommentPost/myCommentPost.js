const express = require("express");
const router = express.Router();
const postDate = require("../../post/utile");

const mysql = require("mysql");

const config = require("../../../config/index");
const { likeCount } = require("../utile");
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

router.get("/", (req, res) => {
  console.log("myPost server");
  console.log(req.session.passport.user.id);
  let userId = req.session.passport.user.id;
  let query = connection.query(
    " select distinct postId from comment where writer = ?",
    [userId],
    (err, commentPostId) => {
      if (err) return res.send(err);
      if (commentPostId.length) {
        let postId = [];
        for (let i = 0; i < commentPostId.length; i++) {
          postId.push(commentPostId[i].postId);
        }
        console.log("postId : ", postId);
        let query = connection.query(
          "select postId, title, description, date, view, categoryName, name, email, role from post left join category on post.category = category.categoryNumber left join user on post.writer = user.id where postId in ( ? ) order by date desc",
          [postId],
          (err, posts) => {
            if (err) return res.send(err);
            if (posts.length) {
              console.log("myPost server : ", posts);
              let query = connection.query(
                "select postId, count(postId) from postlike where postId in ( ? ) group by postId",
                [postId],
                (err, postLike) => {
                  if (err) return res.send(err);
                  let postDateData = postDate(posts);
                  console.log("postDateData : ", postDateData);
                  if (postLike.length) {
                    let postsLike = likeCount(postLike);
                    console.log("postsLike : ", postsLike);
                    return res
                      .status(200)
                      .json({ success: true, posts, postsLike, postDateData });
                  } else {
                    return res
                      .status(200)
                      .json({ success: true, posts, postDateData });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
