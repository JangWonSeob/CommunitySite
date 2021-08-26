const express = require("express");
const router = express.Router();
const postDate = require("../../post/utile");

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
  console.log("question server", req.body);
  let sql = req.body;
  let query = connection.query(
    "insert into question set ?",
    sql,
    (err, row) => {
      if (err) return res.send(err);
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
