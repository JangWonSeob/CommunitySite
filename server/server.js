const express = require("express");
const app = express();
const config = require("./config/index");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const MySQLStore = require("express-mysql-session")(session);

const router = require("./router/index");

const { PORT, DBHOST, DBPOST, DBPW, SESSION_SECRET } = config;

app.listen(PORT, () => {
  console.log(`Express Server Port on ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Options = {
  host: DBHOST,
  port: DBPOST,
  user: "root",
  password: DBPW,
  database: "communitysite",
};

app.use(
  session({
    secure: true, // https에서만 session 정보 주고 받기 가능
    HttpOnly: true, // js를 통해서 session-cookie 강제 불가
    secret: SESSION_SECRET,
    store: new MySQLStore(Options), // session을 mysql에 저장한다.
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);
