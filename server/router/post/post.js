const express = require("express");
const router = express.Router();

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql1",
  database: "communitysite",
});

connection.connect();

router.post("/", (req, res, next) => {
  console.log("req.session : ", req.session);
  let user = req.session.user;
  let name = user.name;
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
            console.log("insert DB data: ", rows.insertId, name);
            if (rows) {
              res.status(200).json({ postSuccess: true });
            }
          }
        );
      } else {
      }
    }
  );
});

module.exports = router;
