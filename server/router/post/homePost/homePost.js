const express = require("express");
const router = express.Router();

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
    "select postId, title, description, date, view, categoryName, name, email, role from post left join category on post.category = category.categoryNumber left join user on post.writer = user.id order by date desc limit 5",
    (err, rows) => {
      if (err) return res.json({ postsSuccess: false, err });
      if (rows.length) {
        return res.json({ postsSuccess: true, rows });
      } else {
      }
    }
  );
});

module.exports = router;
