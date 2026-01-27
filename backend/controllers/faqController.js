const Faq = require("../models/Faq");

exports.getFaqs = async (req, res) => {
  console.log("GET /api/faqs called");
  try {
    const faqs = await Faq.find().sort({ order: 1 }).lean();
    console.log(`Successfully fetched ${faqs.length} faqs`);
    res.status(200).json(faqs);
  } catch (error) {
    console.error("Error in getFaqs:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.createFaq = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }
  console.log("Creating FAQ with body:", JSON.stringify(req.body, null, 2));
  const faq = new Faq(req.body);
  try {
    const newFaq = await faq.save();
    console.log("FAQ created successfully:", newFaq._id);
    res.status(201).json(newFaq);
  } catch (error) {
    console.error("FAQ creation error:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "Faq deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
