const express = require("express");
const router = express.Router();
const home = require("./home/home");
const user = require("./user/index");
const post = require("./post/index");
const comment = require("./comment/index");

router.use("/api/home", home);
router.use("/api/user", user);
router.use("/api/post", post);
router.use("/api/comment", comment);

module.exports = router;
