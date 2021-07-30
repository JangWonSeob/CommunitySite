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
              "select * from post where postId = ?",
              [postId],
              (err, rows) => {
                if (err) return res.send(err);
                if (rows.length) {
                  let Detail = rows[0];
                  let writer = Detail.writer;
                  let query = connection.query(
                    "select * from user where id = ?",
                    [writer],
                    (err, rows) => {
                      if (err)
                        return res.json({ viewUpdateSuccess: false, err });
                      if (rows.length) {
                        let User = rows[0];
                        return res.status(200).json({
                          viewUpdateSuccess: true,
                          Detail,
                          User,
                        });
                      }
                    }
                  );
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
