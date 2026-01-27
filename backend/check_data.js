require("dotenv").config();
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const Faq = require("./models/Faq");
const Review = require("./models/Review");
const Service = require("./models/Service");
const Training = require("./models/Training");

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const blogCount = await Blog.countDocuments();
    const faqCount = await Faq.countDocuments();
    const reviewCount = await Review.countDocuments();
    const serviceCount = await Service.countDocuments();
    const trainingCount = await Training.countDocuments();

    console.log("Counts:");
    console.log("- Blogs:", blogCount);
    console.log("- FAQs:", faqCount);
    console.log("- Reviews:", reviewCount);
    console.log("- Services:", serviceCount);
    console.log("- Trainings:", trainingCount);

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
};

checkData();
