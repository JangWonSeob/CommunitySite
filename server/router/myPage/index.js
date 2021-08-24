const express = require("express");
const router = express.Router();
const userData = require("./userData/userData");
const changeName = require("./changeName/changeName");

router.use("/userData", userData);
router.use("/changeName", changeName);

module.exports = router;
