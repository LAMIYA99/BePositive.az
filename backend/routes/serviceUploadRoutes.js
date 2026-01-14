const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../service"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original name for service files like PDF
  },
});

const upload = multer({
  storage,
});

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File not received" });
  }

  res.json({
    success: true,
    fileUrl: `/service/${req.file.filename}`,
  });
});

module.exports = router;
