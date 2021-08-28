const express = require("express");
const router = express.Router();
const postDate = require("../utile");

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

router.get("/", (req, res, next) => {
  let category = req.query.category;
  console.log("server category : ", category);
  let query = connection.query(
    "select postId, title, description, date, view, categoryName, name, email, role from post left join category on post.category = category.categoryNumber left join user on post.writer = user.id where category.categoryName = ? order by date desc",
    [category],
    (err, categoryPost) => {
      if (err) return res.send(err);
      console.log("categoryPost : ", categoryPost);
      if (categoryPost.length) {
        let postDateData = postDate(categoryPost);
        console.log("postDateData : ", postDateData);
        return res
          .status(200)
          .json({ success: true, categoryPost, postDateData });
      } else {
        return res.json({ message: "게시물 정보가 없습니다." });
      }
    }
  );
});

module.exports = router;
