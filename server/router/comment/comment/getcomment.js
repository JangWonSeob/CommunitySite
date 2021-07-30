const express = require("express");
const router = express.Router();
const async = require("async");

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
  const comment = req.body;
  const postId = comment.postId;
  let query = connection.query(
    "select commentId, writer ,postId ,responseTo ,content, id, name ,email, role, googleId from comment LEFT JOIN user ON comment.writer = user.id where postId = ?",
    [postId],
    (err, comment) => {
      if (err) return res.send(err);
      if (comment.length) {
        console.log("comment data : ", comment);
        return res.status(200).json({ success: true, comment });
      }
    }
  );
});

module.exports = router;
