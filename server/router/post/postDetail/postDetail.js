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
  dateStrings: "date", // 날짜 strgin형태로 표현한다.(이쁘게 만들기)
};

const connection = mysql.createConnection(Options);

connection.connect();

router.post("/", (req, res, next) => {
  console.log("req body : ", req.body);
  let postId = req.body.postId;
  let query = connection.query(
    "select * from post where postId = ?",
    [postId],
    (err, rows) => {
      if (err) return res.send(err);
      if (rows.length) {
        console.log("rows : ", rows[0].view);
        const view = rows[0].view + 1;
        let query = connection.query(
          "update post set view = ? where postId = ?",
          [view, postId],
          (err, rows) => {
            if (err) return res.send(err);
            let query = connection.query(
              "select postId, writer, title, description, date, view, categoryName, name, email, role from post LEFT JOIN category ON post.category = category.categoryNumber LEFT JOIN user ON post.writer = user.id where postId = ?",
              [postId],
              (err, rows) => {
                if (err) return res.send(err);
                if (rows.length) {
                  let PostDetail = rows[0];
                  if (req.session) {
                    if (req.session.passport) {
                      // 로그인이 되어 있다면 userId 값을 sessionId로 저장한다.
                      let sessionUserId = req.session.passport.user.id;
                      if (sessionUserId === PostDetail.writer) {
                        return res.status(200).json({
                          ViewUpdateSuccess: true,
                          MyPost: true,
                          PostDetail,
                        });
                      }
                    }
                  }
                  // 로그인이 되어 있지 않다면 PostDetail 값을 바로 client로 보내준다.
                  return res.status(200).json({
                    viewUpdateSuccess: true,
                    PostDetail,
                  });
                }
              }
            );
          }
        );
      }
    }
  );
});

module.exports = router;
