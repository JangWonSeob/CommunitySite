const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // req.logout();
  if (req.session.passport) {
    if (req.session.passport.user.kakaoId) {
      res.redirect("/api/user/logout");
    }
  }
  req.session.destroy((err) => {
    res.json({ logoutSuccess: true });
  });
});

module.exports = router;
