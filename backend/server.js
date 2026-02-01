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

// CORS - Simplified and Robust
const allowedOrigins = [
  "https://bepositive.az",
  "https://www.bepositive.az",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  }),
);

app.options("*", cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/service", express.static(path.join(__dirname, "service")));

// Cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let storage;
if (process.env.CLOUDINARY_CLOUD_NAME) {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "bepositive_uploads",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "svg"],
    },
  });
} else {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "uploads");
      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  });
}

const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const imageUrl =
    req.file.path || req.file.secure_url || `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// Cache Middleware Placeholder (Fixed stability)
const cacheMiddleware = (duration) => (req, res, next) => next();

// API Routes
app.use("/api/blogs", cacheMiddleware(300), require("./routes/blogRoutes"));
app.use(
  "/api/trainings",
  cacheMiddleware(300),
  require("./routes/trainingRoutes"),
);
app.use(
  "/api/services",
  cacheMiddleware(300),
  require("./routes/serviceRoutes"),
);
app.use("/api/reviews", cacheMiddleware(300), require("./routes/reviewRoutes"));
app.use(
  "/api/notifications",
  cacheMiddleware(30),
  require("./routes/notificationRoutes"),
);
app.use("/api/brands", cacheMiddleware(600), require("./routes/brandRoutes"));
app.use("/api/team", cacheMiddleware(300), require("./routes/teamRoutes"));
app.use("/api/faqs", cacheMiddleware(600), require("./routes/faqRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/bepositive";
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected...");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
