const express = require("express");
const app = express();
const router = express.Router();
const config = require("./config/index");

const { PORT } = config;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Express Server Port on ${PORT}`);
});
