const express = require("express");
const router = express.Router();
const comment = require("./comment/comment");
const getcomment = require("./comment/getcomment");

router.use("/addComment", comment);
router.use("/getComment", getcomment);

module.exports = router;
