const express = require("express");
const router = express.Router();
const addPost = require("./addPost/addPost");
const homePosts = require("./homePosts/homePosts");
const postDetail = require("./postDetail/postDetail");
const postDelete = require("./postDelete/postDelete");

router.use("/add", addPost);
router.use("/posts", homePosts);
router.use("/postDetail", postDetail);
router.use("/postDelete", postDelete);

module.exports = router;
