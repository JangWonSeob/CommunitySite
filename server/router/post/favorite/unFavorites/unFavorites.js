const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const config = require("../../../../config/index");
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
  // Client에서 정보를 받는다.
  let postId = req.body.postId;
  let userId = req.session.passport.user.id;
  // 받은 정보를 토대로 즐겨찾기 되어 있는지 확인한다.
  let query = connection.query(
    "select * from postFavorites where postId = ? and userId = ?",
    [postId, userId],
    (err, rows) => {
      if (err) return res.status(400).json({ success: false, err });
      if (rows.length) {
        // 즐겨찾기 정보가 있다면 정보를 삭제한다.
        let query = connection.query(
          "delete from postFavorites where postId = ? and userId = ?",
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
