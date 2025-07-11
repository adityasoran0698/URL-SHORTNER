const express = require("express");
const router = express.Router();
const URL = require("../models/url.js");

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const allurls = await URL.find({ createdById: req.user._id });
  res.render("home", {
    urls: allurls,
    user: req.user,
  });
});
router.get("/signup", async (req, res) => {
  return res.render("signup");
});
router.get("/login", async (req, res) => {
  return res.render("login");
});
router.get("/newURL", (req, res) => {
  return res.render("newurl");
});

module.exports = router;
