const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    image: {
      type: String,
      required: true,
    },
    tags: [
      {
        en: { type: String, required: true },
        az: { type: String, required: true },
      },
    ],
    link: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
