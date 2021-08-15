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
  if (req.session.passport) {
    // Session에 로그인 정보가 있다면, 즉 로그인이 되어있다면 즐겨찾기 여부를 확인합니다.
    let postId = req.body.postId;
    let userId = req.session.passport.user.id;
    let query = connection.query(
      "select * from postFavorites where postId = ? && userId = ?",
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
  } else {
    // 로그인 정보가 없으면 로그인이 되어 있지 않다고 Client에 보내줍니다.
    return res.json({ logining: false });
  }
});

module.exports = router;
