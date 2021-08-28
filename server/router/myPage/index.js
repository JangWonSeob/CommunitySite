const express = require("express");
const router = express.Router();
const userData = require("./userData/userData");
const changeName = require("./changeName/changeName");
const changePassword = require("./changePassword/changePassword");
const withDrawal = require("./withDrawal/withDrawal");
const myPost = require("./myPost/myPost");
const question = require("./question/question");
const favoritesPost = require("./favoritesPost/favoritesPost");
const grade = require("./grade/grade");
const myCommentPost = require("./myCommentPost/myCommentPost");

router.use("/userData", userData);
router.use("/changeName", changeName);
router.use("/changePassword", changePassword);
router.use("/withDrawal", withDrawal);
router.use("/myPost", myPost);
router.use("/question", question);
router.use("/favoritesPost", favoritesPost);
router.use("/grade", grade);
router.use("/myCommentPost", myCommentPost);

module.exports = router;
