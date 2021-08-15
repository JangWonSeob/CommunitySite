const express = require("express");
const router = express.Router();
const getLikes = require("./getLikes/getLikes");
const upLike = require("./upLike/upLike");
const unLike = require("./unLike/unLike");

router.use("/getLikes", getLikes);
router.use("/upLike", upLike);
router.use("/unLike", unLike);

module.exports = router;
