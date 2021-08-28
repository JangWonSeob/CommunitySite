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
  console.log("req.session header : ", req.session);
  let query = connection.query(
    "select postId, title, description, date, view, categoryName, name, email, role from post left join category on post.category = category.categoryNumber left join user on post.writer = user.id where not category = 1 order by date desc",
    (err, rows) => {
      if (err) return res.json({ postsSuccess: false, err });
      if (rows.length) {
        let postDateData = postDate(rows);
        console.log("postDateData : ", postDateData);
        return res.json({ postsSuccess: true, rows, postDateData });
      } else {
      }
    }
  );
});

module.exports = router;
