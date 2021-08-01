const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.passport) {
    let session = req.session.passport.user;
    if (!session) {
      return res.json({ isAuth: false });
    } else {
      return res.status(200).json({
        id: session.id,
        isAdmin: session.role === "normal" ? false : true,
        isAuth: true,
        email: session.email,
        name: session.name,
        role: session.role,
      });
    }
  }
});

module.exports = router;
