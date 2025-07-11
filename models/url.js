const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        type: Number,
      },
    ],
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    createdByName: {
      type: mongoose.Schema.Types.String,
      ref: "users",
    },
    createdByEmail: {
      type: mongoose.Schema.Types.String,
      ref: "users",
    },
  },
  { timestamps: true }
);
const URL = mongoose.model("url", urlSchema);
module.exports = URL;
