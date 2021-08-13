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

router.post("/", (req, res) => {
  let postId = req.body.postNumber;
  let userId = req.session.passport.user.id;
  let query = connection.query(
    "select * from postLike where postNumber = ? and userId = ?",
    [postId, userId],
    (err, rows) => {
      if (err) return res.status(400).json({ success: false, err });
      if (rows.length) {
        let query = connection.query(
          "delete from postLike where postNumber = ? and userId = ?",
          [postId, userId],
          (err, rows) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true });
          }
        );
      }
    }
  );
});

module.exports = router;
