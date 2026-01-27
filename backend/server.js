require("dotenv").config();
const express = require("express");

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});
const mongoose = require("mongoose");
const cors = require("cors");
// Routes are required inline below
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://bepositive.az",
      "https://www.bepositive.az",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: [
      "https://bepositive.az",
      "https://www.bepositive.az",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  }),
);

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server is running", time: new Date() });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/service", express.static(path.join(__dirname, "service")));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
  });
});

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let storage;
if (process.env.CLOUDINARY_CLOUD_NAME) {
  console.log("Using Cloudinary for storage");
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "bepositive_uploads",
      allowed_formats: ["jpg", "png", "jpeg", "webp", "svg"],
    },
  });
} else {
  console.warn("Cloudinary not configured, falling back to local storage");
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
}

const upload = multer({ storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const imageUrl =
    req.file.path || req.file.secure_url || `/uploads/${req.file.filename}`;

  console.log(`Image uploaded: ${imageUrl}`);
  res.json({ url: imageUrl });
});

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

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/bepositive";
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    const serviceUploadRoutes = require("./routes/serviceUploadRoutes");
    app.use("/api/service-upload", serviceUploadRoutes);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Frontend URL expected: ${process.env.BACKEND_URL || "not set"}`,
      );
    });

    server.on("error", (err) => {
      console.error("Server Listen Error:", err);
    });
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
