const express = require("express");
const router = express.Router();
const auth = require("./auth/auth");
const register = require("./register/register");
const login = require("./login/login");
const logout = require("./logout/logout");

router.use("/auth", auth);
router.use("/register", register);
router.use("/login", login);
router.use("/logout", logout);

module.exports = router;
