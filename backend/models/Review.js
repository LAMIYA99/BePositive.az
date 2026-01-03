const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    role: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    text: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
