const express = require("express");
const router = express.Router();
const addPost = require("./addPost/addPost");
const everyPost = require("./everyPost/everyPost");
const homePost = require("./homePost/homePost");
const popularPost = require("./homePost/section/popularPost");
const postDetail = require("./postDetail/postDetail");
const postDelete = require("./postDelete/postDelete");
const favorite = require("./favorite/favorite/favorite");
const favorites = require("./favorite/favorites/favorites");
const unFavorites = require("./favorite/unFavorites/unFavorites");
const like = require("./likeDislike/like/index");
const dislike = require("./likeDislike/dislike/index");
const postBefore = require("./postDetail/section/postBefore");
const postNext = require("./postDetail/section/postNext");
const search = require("./search/search");
const postData = require("./postData/postData");
const modifyPost = require("./modifyPost/modifyPost");
const category = require("./category/category");
const categoryPost = require("./categoryPost/categoryPost");

router.use("/add", addPost);
router.use("/everyPost", everyPost);
router.use("/homePost", homePost);
router.use("/popularPost", popularPost);
router.use("/postDetail", postDetail);
router.use("/postDelete", postDelete);
router.use("/favorite", favorite);
router.use("/favorites", favorites);
router.use("/unFavorites", unFavorites);
router.use("/like", like);
router.use("/dislike", dislike);
router.use("/postBefore", postBefore);
router.use("/postNext", postNext);
router.use("/search", search);
router.use("/postData", postData);
router.use("/modifyPost", modifyPost);
router.use("/category", category);
router.use("/categoryPost", categoryPost);

module.exports = router;
