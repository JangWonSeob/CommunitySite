const express = require("express");
const router = express.Router();
const addPost = require("./addPost/addPost");
const everyPost = require("./everyPost/everyPost");
const homePost = require("./homePost/homePost");
const postDetail = require("./postDetail/postDetail");
const postDelete = require("./postDelete/postDelete");
const favorite = require("./favorite/favorite/favorite");
const favorites = require("./favorite/favorites/favorites");
const unFavorites = require("./favorite/unFavorites/unFavorites");
const like = require("./likeDislike/like/index");
const dislike = require("./likeDislike/dislike/index");
const postBeforeNext = require("./postDetail/section/postBeforeNext");

router.use("/add", addPost);
router.use("/everyPost", everyPost);
router.use("/homePost", homePost);
router.use("/postDetail", postDetail);
router.use("/postDelete", postDelete);
router.use("/favorite", favorite);
router.use("/favorites", favorites);
router.use("/unFavorites", unFavorites);
router.use("/like", like);
router.use("/dislike", dislike);
router.use("/postBeforeNext", postBeforeNext);

module.exports = router;
