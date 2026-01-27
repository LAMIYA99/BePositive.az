require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("./models/Blog");

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const blog = await Blog.findOne();
    if (blog) {
      console.log("Full Blog Document:");
      console.log(JSON.stringify(blog, null, 2));
    } else {
      console.log("No blog found");
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
};

checkData();
