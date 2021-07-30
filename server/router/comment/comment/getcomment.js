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
  const user = req.session.user;
  console.log("user : ", user);
  const writer = user.name;
  console.log("writer : ", writer);
  const comment = req.body;
  const postId = comment.postId;
  let query = connection.query(
    "select * from comment where postId = ? ",
    [postId],
    (err, comment) => {
      console.log(" comment : ", comment);
      if (err) res.json({ success: false, err });
      if (comment.length) {
        return res.status(200).json({ success: true, comment });
      }
    }
  );
});

module.exports = router;
