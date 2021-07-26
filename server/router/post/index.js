const express = require("express");
const router = express.Router();
const addPost = require("./addPost/addPost");
const homePosts = require("./homePosts/homePosts");
const postDetail = require("./postDetail/postDetail");

router.use("/add", addPost);
router.use("/posts", homePosts);
router.use("/getPostDetail", postDetail);

module.exports = router;
