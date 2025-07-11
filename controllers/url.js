const shortid = require("shortid");
const URL = require("../models/url.js");
const CreateNewURLShortID = async (req, res) => {
  const shortId = shortid();
  const body = req.body;

  const result = await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdById: req.user._id,
    createdByName: req.user.name,
    createdByEmail: req.user.email,
  });

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  res.render("home", {
    id: shortId,
    baseUrl,
    user: req.user,
  });
};

const GetAllURLsData = async (req, res) => {
  const result = await URL.find({});
  res.status(200).json(result);
};

const RedirectToOriginalURL = async (req, res) => {
  const body = req.body;
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: Date.now(),
      },
    }
  );
  res.redirect(entry.redirectURL);
};

const DeleteUrl = async (req, res) => {
  const shortid = req.params.id;

  try {
    await URL.findOneAndDelete({ shortId: shortid });
    return res.redirect("/");
  } catch (err) {
    console.error("Error deleting URL:", err);
    return res.status(500).send("Failed to delete URL");
  }
};
module.exports = {
  CreateNewURLShortID,
  GetAllURLsData,
  RedirectToOriginalURL,
  DeleteUrl,
};
