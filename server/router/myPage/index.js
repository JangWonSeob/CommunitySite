const express = require("express");
const router = express.Router();
const userData = require("./userData/userData");
const changeName = require("./changeName/changeName");
const changePassword = require("./changePassword/changePassword");
const withDrawal = require("./withDrawal/withDrawal");

router.use("/userData", userData);
router.use("/changeName", changeName);
router.use("/changePassword", changePassword);
router.use("/withDrawal", withDrawal);

module.exports = router;
