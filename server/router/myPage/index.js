const express = require("express");
const router = express.Router();
const userData = require("./userData/userData");
const changeName = require("./changeName/changeName");
const changePassword = require("./changePassword/changePassword");

router.use("/userData", userData);
router.use("/changeName", changeName);
router.use("/changePassword", changePassword);

module.exports = router;
