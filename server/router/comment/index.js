const express = require("express");
const router = express.Router();
const addComment = require("./comment/addComment");
const getComment = require("./comment/getComment");

router.use("/addComment", addComment);
router.use("/getComment", getComment);

module.exports = router;
