const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// MULTER
const upload = multer({
  storage,
});

// ⚠️ DİQQƏT: field name = "file"
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File not received" });
  }

  res.json({
    success: true,
    imageUrl: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;
