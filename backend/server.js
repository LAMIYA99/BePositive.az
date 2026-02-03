require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5001;

// Base CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/service", express.static(path.join(__dirname, "service")));

// Routes Placeholder
const cacheMiddleware = (d) => (req, res, next) => next();

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/trainings", require("./routes/trainingRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/faqs", require("./routes/faqRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/bepositive";
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected Successfully");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`DB Error: ${error.message}`);
  }
};

connectDB();
