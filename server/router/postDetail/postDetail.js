const express = require("express");
const router = express.Router();

const mysql = require("mysql");

const config = require("../../config/index");
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

router.post("/", (req, res, next) => {
  console.log("req.body post : ", req.body);
  let postId = req.body.postId;
  console.log("postId : ", postId);
  let query = connection.query(
    "select * from post where postId = ?",
    [postId],
    (err, rows) => {
      if (err) return res.send(err);
      if (rows.length) {
        return res.status(200).json({ postsSuccess: true, rows });
      } else {
        res.status(400).json({ postsSuccess: false });
      }
    }
  );
});

module.exports = router;
