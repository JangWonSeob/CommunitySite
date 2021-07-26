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
                  return res.json({ viewUpdateSuccess: true, Detail });
                }
                return res.json({ viewUpdateSuccess: false, err });
              }
            );
          }
        );
      }
    }
  );
});

module.exports = router;
