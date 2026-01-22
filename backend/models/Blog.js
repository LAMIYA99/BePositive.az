const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, default: "" },
      az: { type: String, default: "" },
    },
    excerpt: {
      en: { type: String, default: "" },
      az: { type: String, default: "" },
    },
    content: {
      en: { type: String, default: "" },
      az: { type: String, default: "" },
    },
    author: {
      type: String,
      default: "Admin",
    },
    tags: [
      {
        en: { type: String, required: false },
        az: { type: String, required: false },
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    image: {
      type: String,
      default: "",
    },
    image2: {
      type: String,
      default: "",
    },
    sections: [
      {
        content: {
          en: { type: String, default: "" },
          az: { type: String, default: "" },
        },
        image: { type: String, default: "" },
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
