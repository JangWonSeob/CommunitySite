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

router.get("/", (req, res, next) => {
  let query = connection.query(
    "select postId from postfavorites group by postId having count(postId) > 0 order by count(postId) desc limit 5",
    (err, rows) => {
      if (err) return res.json({ postsSuccess: false, err });
      if (rows.length) {
        //console.log("popular post server : ", rows[0]);
        let postId = [];
        for (let i = 0; i < 5; i++) {
          postId.push(rows[i].postId);
        }
        //console.log("postId : ", postId);
        let query = connection.query(
          "select postId, title, description, date, view, categoryName, name, email, role from post LEFT JOIN category ON post.category = category.categoryNumber LEFT JOIN user ON post.writer = user.id where postId in ( ? ) order by date desc",
          [postId],
          (err, rows) => {
            if (err) return res.json({ postsSuccess: false, err });
            //console.log("popular post server  1111 : ", rows);
            return res.json({ postsSuccess: true, rows });
          }
        );
        // return res.json({ postsSuccess: true, rows });
      } else {
      }
    }
  );
});

module.exports = router;
