const express = require("express");
const router = express.Router();
const comment = require("./comment/comment");

router.use("/addComment", comment);

module.exports = router;
