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

    const blog = await Blog.findOne();
    const faq = await Faq.findOne();
    const review = await Review.findOne();
    const service = await Service.findOne();
    const training = await Training.findOne();

    console.log("Samples:");
    console.log("- Blog Title:", blog ? JSON.stringify(blog.title) : "None");
    console.log("- FAQ Question:", faq ? JSON.stringify(faq.question) : "None");
    console.log(
      "- Review Name:",
      review ? JSON.stringify(review.name) : "None",
    );
    console.log(
      "- Service Title:",
      service ? JSON.stringify(service.title) : "None",
    );
    console.log(
      "- Training Title:",
      training ? JSON.stringify(training.title) : "None",
    );

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
};

checkData();
