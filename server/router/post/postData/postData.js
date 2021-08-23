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
  let postId = req.body.postId;
  console.log("req.body", postId);
  let query = connection.query(
    "select * from post where postId = ?",
    [postId],
    (err, post) => {
      console.log(1);
      if (err) return res.send(err);
      console.log(1);
      if (post.length) {
        const postData = post[0];
        return res.status(200).json({ success: true, postData });
      }
    }
  );
});

module.exports = router;
