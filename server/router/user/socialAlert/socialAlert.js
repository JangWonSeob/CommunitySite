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

router.get("/", (req, res) => {
  // 구글 로그인시 이미 이메일이 존재한다면 flash에 있는 메시지를 보내준다.
  if (req.session.flash) {
    console.log(req.session.flash.error[0]);
    res.json({
      message: req.session.flash.error[0],
    });
    // 메시지를 지운 후 session을 지워준다. 다시 로그인 페이지로 넘어 올 때 flash 메시지를 보내주는 것을 방지하기 위해서
    // 이를 통해서 소셜 로그인 실패 후 다시 로그인 페이지를 접속 했을 때 flash에 있는 메시지가 전송 되는 것을 막을 수 있다.
    req.session.destroy(() => {});
  }
});

module.exports = router;
