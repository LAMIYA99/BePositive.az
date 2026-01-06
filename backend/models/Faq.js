const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    answer: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faq", faqSchema);
