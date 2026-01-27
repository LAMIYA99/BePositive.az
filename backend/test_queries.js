require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const Faq = require("./models/Faq");
const Review = require("./models/Review");

const testQueries = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    console.log("Testing Blog Query...");
    try {
      const blogs = await Blog.find().lean(); // Use lean to avoid hydration issues for testing base data
      console.log(`- Blog Query Success: found ${blogs.length} docs`);
      // Try without lean to see if hydration fails
      await Blog.find();
      console.log("- Blog Hydration Success");
    } catch (e) {
      console.error("- Blog Query Failed:", e.message);
    }

    console.log("Testing FAQ Query...");
    try {
      const faqs = await Faq.find().lean();
      console.log(`- FAQ Query Success: found ${faqs.length} docs`);
      await Faq.find();
      console.log("- FAQ Hydration Success");
    } catch (e) {
      console.error("- FAQ Query Failed:", e.message);
    }

    console.log("Testing Review Query...");
    try {
      const reviews = await Review.find().lean();
      console.log(`- Review Query Success: found ${reviews.length} docs`);
      await Review.find();
      console.log("- Review Hydration Success");
    } catch (e) {
      console.error("- Review Query Failed:", e.message);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("Connection Error:", err);
  }
};

testQueries();
