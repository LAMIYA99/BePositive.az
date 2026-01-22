const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Brand", BrandSchema);
