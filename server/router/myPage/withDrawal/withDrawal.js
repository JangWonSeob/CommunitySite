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
  console.log(req.session.passport.user.id);
  let userId = req.session.passport.user.id;
  let query = connection.query(
    "delete from user where id = ?",
    [userId],
    (err, user) => {
      if (err) return res.send(err);
      let query = connection.query(
        "delete from post where writer = ?",
        [userId],
        (err, rows) => {
          if (err) return res.send(err);
          let query = connection.query(
            "delete from comment where writer = ?",
            [userId],
            (err, user) => {
              if (err) return res.send(err);
              let query = connection.query(
                "delete from postFavorites where userId = ?",
                [userId],
                (err, rows) => {
                  if (err) return res.send(err);
                  let query = connection.query(
                    "delete from postLike where userId = ?",
                    [userId],
                    (err, user) => {
                      if (err) return res.send(err);
                      let query = connection.query(
                        "delete from postDislike where userId = ?",
                        [userId],
                        (err, rows) => {
                          if (err) return res.send(err);
                          req.session.destroy((err) => {
                            return res.status(200).json({ success: true });
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

module.exports = router;
