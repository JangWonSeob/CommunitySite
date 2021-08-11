const express = require("express");
const router = express.Router();
const addPost = require("./addPost/addPost");
const everyPost = require("./everyPost/everyPost");
const homePost = require("./homePost/homePost");
const postDetail = require("./postDetail/postDetail");
const postDelete = require("./postDelete/postDelete");

router.use("/add", addPost);
router.use("/everyPost", everyPost);
router.use("/homePost", homePost);
router.use("/postDetail", postDetail);
router.use("/postDelete", postDelete);

module.exports = router;
