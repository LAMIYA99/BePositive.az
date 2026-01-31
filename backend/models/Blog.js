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
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true },
);

blogSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let baseTitle = this.title?.az || this.title?.en || "blog";
    let slug = baseTitle
      .toLowerCase()
      .trim()
      .replace(/[əğışçöü]/g, (m) => {
        const chars = {
          ə: "e",
          ğ: "g",
          ı: "i",
          ş: "s",
          ç: "c",
          ö: "o",
          ü: "u",
        };
        return chars[m];
      })
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!slug) slug = "blog";

    const BlogModel = this.constructor;
    let slugExists = await BlogModel.findOne({
      slug,
      _id: { $ne: this._id },
    });

    let counter = 1;
    let originalSlug = slug;
    while (slugExists) {
      slug = `${originalSlug}-${counter}`;
      slugExists = await BlogModel.findOne({
        slug,
        _id: { $ne: this._id },
      });
      counter++;
    }
    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
