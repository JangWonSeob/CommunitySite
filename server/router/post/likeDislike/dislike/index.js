const express = require("express");
const router = express.Router();

const getDislikes = require("./getDislikes/getDislikes");
const upDislike = require("./upDislike/upDislike");
const unDislike = require("./unDislike/unDislike");

router.use("/getDislikes", getDislikes);
router.use("/upDislike", upDislike);
router.use("/unDislike", unDislike);

module.exports = router;
