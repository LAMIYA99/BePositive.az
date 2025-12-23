require("dotenv").config(); 
require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const storage = multer.diskStorage({
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

const upload = multer({ storage });


app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ url: `http://localhost:5001/uploads/${req.file.filename}` });
});


app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/bepositive",
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      console.error("Server Listen Error:", err);
    });
  } catch (error) {
    console.error(`MongoDB Connection Error Detail:`);
    console.error(`Message: ${error.message}`);
    console.error(`Code: ${error.code}`);
    if (error.reason) console.error(`Reason: ${error.reason}`);
    process.exit(1);
  }
};

connectDB();
