const express = require("express");
const router = express.Router();

// Simple mock login endpoint
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.json({
      success: true,
      token: "mock-jwt-token-for-demo",
      user: { username: "admin" },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }
});

module.exports = router;
