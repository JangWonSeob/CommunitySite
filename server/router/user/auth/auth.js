const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let session = req.session.passport.user;
  console.log("session data : ", session);
  console.log("session data 1111 : ", session.id);
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
});

module.exports = router;
