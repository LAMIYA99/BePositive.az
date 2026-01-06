const Faq = require("../models/Faq");

exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFaq = async (req, res) => {
  const faq = new Faq(req.body);
  try {
    const newFaq = await faq.save();
    res.status(201).json(newFaq);
  } catch (error) {
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
