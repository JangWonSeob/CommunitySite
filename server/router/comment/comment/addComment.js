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
  const data = req.body;
  const writer = req.session.passport.user.id;
  const content = data.content;
  const postId = data.postId;
  console.log("data : ", data);
  let sql;
  if (req.body.sigineComment) {
    console.log("sigineComment");
    sql = {
      writer,
      content,
      postId,
    };
  } else {
    console.log("replyComment");
    sql = {
      writer,
      content,
      postId,
      responseToCommentId: data.responseToCommentId,
    };
  }

  console.log("comment server data : ", sql);
  let query = connection.query(
    "insert into comment set ?",
    sql,
    (err, rows) => {
      if (err) res.send(err);
      let query = connection.query(
        "select commentId ,postId ,responseToCommentId ,content, id, name ,email, role, googleId from comment LEFT JOIN user ON comment.writer = user.id where postId = ?",
        [postId],
        (err, comment) => {
          console.log(" comment : ", comment);
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
