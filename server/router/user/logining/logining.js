const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let result = false;
  if (req.session) {
    if (req.session.passport) {
      result = true;
    }
  }
  return res.json({ loginIng: result });
});

module.exports = router;
