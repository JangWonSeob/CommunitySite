const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const mysql = require("mysql");

const config = require("../../../config/index");
const { DBHOST, DBPOST, DBPW, AUTH_EMAIL, AUTH_PASSWORD } = config;
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
  let email = req.body.email;
  let auth = Math.random().toString(36).slice(2);
  const snedEmail = () => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.ethereal.email",
      port: 465,
      secure: true,
      auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
      },
    });
    let mailOption = {
      from: AUTH_EMAIL,
      to: email,
      subject: "Hello Chagne Password self-authentication",
      html: `
          <div style="text-align: center;">
            <h3 style="color: #505050">Autn number</h3>
            <br />
            <p>${auth}</p>
          </div>
      `,
    };
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        console.log("Email sent : ", info.response);
        return res.status(200).json({ success: true });
      }
    });
  };
  snedEmail();
});

module.exports = router;
