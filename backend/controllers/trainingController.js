const Training = require("../models/Training");

// Get all trainings
exports.getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.status(200).json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new training
exports.createTraining = async (req, res) => {
  const training = new Training(req.body);
  try {
    const newTraining = await training.save();
    res.status(201).json(newTraining);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a training
exports.updateTraining = async (req, res) => {
  try {
    const updatedTraining = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTraining);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a training
exports.deleteTraining = async (req, res) => {
  try {
    await Training.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Training deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
