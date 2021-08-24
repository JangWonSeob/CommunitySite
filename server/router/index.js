const express = require("express");
const router = express.Router();
const user = require("./user/index");
const post = require("./post/index");
const comment = require("./comment/index");
const myPage = require("./myPage/index");

router.use("/api/user", user);
router.use("/api/post", post);
router.use("/api/comment", comment);
router.use("/api/myPage", myPage);

module.exports = router;
