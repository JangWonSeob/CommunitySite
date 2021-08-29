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

router.get("/", (req, res) => {
  let query = connection.query("select * from category", (err, category) => {
    if (err) return res.send(err);
    console.log("category : ", category);
    if (category.length) {
      return res.status(200).json({ success: true, category });
    }
  });
});

module.exports = router;
