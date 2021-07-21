const express = require("express");
const router = express.Router();
const home = require("./home/home");
const auth = require("./auth/auth");
const register = require("./register/register");
const login = require("./login/login");
const logout = require("./logout/logout");
const addPost = require("./addPost/addPost");
const posts = require("./posts/posts");

router.use("/api/home", home);
router.use("/api/user/auth", auth);
router.use("/api/user/register", register);
router.use("/api/user/login", login);
router.use("/api/user/logout", logout);
router.use("/api/post/add", addPost);
router.use("/api/post/posts", posts);

module.exports = router;
