const express = require("express");
const router = express.Router();
const liked = require("./liked/liked");
const like = require("./like/like");
const unLike = require("./unLike/unLike");

router.use("/liked", liked);
router.use("/like", like);
router.use("/unLiked", unLike);

module.exports = router;
