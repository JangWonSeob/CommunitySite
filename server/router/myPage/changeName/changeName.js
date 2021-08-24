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
  console.log(req.session.passport.user.id);
  let userId = req.session.passport.user.id;
  console.log("chang Name server", req.body.name);
  let name = req.body.name;
  let query = connection.query(
    "Update user set name = ? where id = ?",
    [name, userId],
    (err, rows) => {
      if (err) return res.send(err);
      return res.json({ success: true });
    }
  );
});

module.exports = router;
