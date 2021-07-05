const express = require("express");
const app = express();
const config = require("./config/index");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);

const router = require("./router/index");

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`Express Server Port on ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql1",
  database: "communitysite",
};

app.use(
  session({
    secret: "keyboard cat",
    store: new MySQLStore(Options), // session을 mysql에 저장한다.
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);
