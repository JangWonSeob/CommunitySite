const express = require("express");
const router = express.Router();
const home = require("./home/home");
const register = require("./register/register");
const login = require("./login/login");
const logout = require("./logout/logout");
const post = require("./post/post");

router.use("/api/home", home);
router.use("/api/user/register", register);
router.use("/api/user/login", login);
router.use("/api/user/logout", logout);
router.use("/api/post/add", post);

module.exports = router;
