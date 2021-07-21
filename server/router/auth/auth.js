const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.json({ isAuth: false });
  } else {
    return res.status(200).json({
      id: req.session.id,
      isAdmin: req.session.role === "normal" ? false : true,
      isAuth: true,
      email: req.session.user.email,
      name: req.session.user.name,
      role: req.session.user.role,
    });
  }
});

module.exports = router;
