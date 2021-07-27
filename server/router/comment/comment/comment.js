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
  const writer = user.name;
  const comment = req.body;
  const content = comment.content;
  const postId = comment.postId;
  let sql = {
    writer: writer,
    content: content,
    postId: postId,
  };
  let query = connection.query(
    "insert into comment set ?",
    sql,
    (err, rows) => {
      if (err) res.send(err);
      let query = connection.query(
        "select * from comment where postId = ? ",
        [postId],
        (err, comment) => {
          if (err) res.json({ success: false, err });
          if (comment.length) {
            return res.status(200).json({ success: true, comment });
          }
        }
      );
    }
  );
});

module.exports = router;
