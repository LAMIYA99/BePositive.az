const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    message: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    type: {
      type: String,
      enum: ["survey", "info"],
      default: "survey",
    },
    link: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    options: [
      {
        label: {
          en: { type: String, required: true },
          az: { type: String, required: true },
        },
        value: { type: String, required: true },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    showDelay: {
      type: Number,
      default: 3000,
    },

    responses: [
      {
        value: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
