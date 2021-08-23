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
};

const connection = mysql.createConnection(Options);

connection.connect();

router.post("/", (req, res) => {
  let post = req.body;
  let postId = post.postId;
  let title = post.title;
  let description = post.description;
  let category = post.category;
  let date = new Date();
  console.log("req.body", date);
  const query = connection.query(
    "update post set title = ?, description = ?, category = ?, date = ?  where postId = ?",
    [title, description, category, date, postId],
    (err, rows) => {
      if (err) return res.send(err);
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
