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
  console.log("req.session : ", req.session);
  console.log("req.body server data : ", req.body);
  let user = req.session.passport.user;
  let id = user.id;
  let post = req.body;
  let title = post.title;
  let description = post.description;
  let category = post.category;
  let query = connection.query(
    "select * from user where id=?",
    [id],
    (err, rows) => {
      if (err) return res.json({ postSuccess: false, err });
      if (rows.length) {
        let sql = {
          writer: id,
          title,
          description,
          category,
        };
        let query = connection.query(
          "insert into post set ?",
          sql,
          (err, rows) => {
            if (err) throw err;
            console.log("insert DB data: ", rows.insertId);
            if (rows) {
              return res.status(200).json({ postSuccess: true });
            }
          }
        );
      } else {
      }
    }
  );
});

module.exports = router;
