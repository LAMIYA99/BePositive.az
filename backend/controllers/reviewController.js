const Review = require("../models/Review");

exports.getReviews = async (req, res) => {
  console.log("GET /api/reviews called");
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    console.log(`Successfully fetched ${reviews.length} reviews`);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error in getReviews:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
