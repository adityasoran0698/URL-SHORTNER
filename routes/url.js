const express = require("express");
const router = express.Router();
const {
  CreateNewURLShortID,
  GetAllURLsData,
  RedirectToOriginalURL,
  TotalClicks,
  DeleteUrl,
} = require("../controllers/url.js");
router.post("/newURL", CreateNewURLShortID);
router.get("/", GetAllURLsData);
router.get("/:shortId", RedirectToOriginalURL);
router.post("/deleteURL/:id", DeleteUrl);
module.exports = router;
