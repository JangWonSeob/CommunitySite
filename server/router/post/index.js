const express = require("express");
const router = express.Router();
const addPost = require("./addPost/addPost");
const everyPost = require("./everyPost/everyPost");
const homePost = require("./homePost/homePost");
const postDetail = require("./postDetail/postDetail");
const postDelete = require("./postDelete/postDelete");
const liked = require("./like/liked/liked");
const like = require("./like/like/like");
const unLike = require("./like/unLike/unLike");

router.use("/add", addPost);
router.use("/everyPost", everyPost);
router.use("/homePost", homePost);
router.use("/postDetail", postDetail);
router.use("/postDelete", postDelete);
router.use("/liked", liked);
router.use("/like", like);
router.use("/unLike", unLike);

module.exports = router;
