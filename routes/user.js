const express = require("express");
const router = express.Router();
const { UserSignup, UserLogin } = require("../controllers/user.js");
router.post("/", UserSignup);
router.post("/login", UserLogin);
router.get("/signup", (req, res) => {
  return res.redirect("/signup");
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
});

module.exports = router;
