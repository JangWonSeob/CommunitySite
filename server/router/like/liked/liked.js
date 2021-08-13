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
  if (req.session.passport) {
    if (req.session.passport) {
      let postId = req.body.postNumber;
      console.log("postId : ", postId);
      let userId = req.session.passport.user.id;
      console.log("userId : ", userId);

      let query = connection.query(
        "select * from postLike where postNumber = ? && userId = ?",
        [postId, userId],
        (err, rows) => {
          if (err) return res.status(400).send(err);
          let result = false;
          if (rows.length) {
            result = true;
          }
          return res.status(200).json({ liked: result, logining: true });
        }
      );
    }
  } else {
    return res.json({ logining: false });
  }
});

module.exports = router;
