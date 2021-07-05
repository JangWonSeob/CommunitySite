const express = require("express");
const app = express();
const config = require("./config/index");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const router = require("./router/index");
const server = require("./server");

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`Express Server Port on ${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
