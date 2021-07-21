const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //console.log("/", req.user);
  res.json(req.session);
  //console.log("req.session data :", req.session);
});

module.exports = router;
