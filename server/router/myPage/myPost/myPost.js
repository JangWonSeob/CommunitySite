const express = require("express");
const router = express.Router();
const postDate = require("../../post/utile");

const mysql = require("mysql");

const config = require("../../../config/index");
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
    "select postId, title, description, date, view, categoryName, name, email, role from post left join category on post.category = category.categoryNumber left join user on post.writer = user.id where user.id = ? order by date desc",
    [userId],
    (err, posts) => {
      if (err) return res.send(err);
      if (posts.length) {
        console.log("myPost server : ", posts);
        let postId = [];
        for (let i = 0; i < posts.length; i++) {
          postId.push(posts[i].postId);
        }
        console.log("postId : ", postId);
        let query = connection.query(
          "select postId, count(postId) from postlike where postId in ( ? ) group by postId",
          [postId],
          (err, postLike) => {
            if (err) return res.send(err);
            let postDateData = postDate(posts);
            console.log("postDateData : ", postDateData);
            if (postLike.length) {
              let postsLike = [];
              postLike.map((like) => {
                let likeData = Object.values(like);
                console.log("likeData :", likeData[1]);
                postsLike.push({
                  postId: likeData[0],
                  likeLength: likeData[1],
                });
              });
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
});

module.exports = router;
