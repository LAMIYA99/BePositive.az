const Notification = require("../models/Notification");

exports.getActiveNotification = async (req, res) => {
  try {
    const notification = await Notification.findOne({ isActive: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNotification = async (req, res) => {
  console.log("Received notification data:", JSON.stringify(req.body, null, 2));
  const notification = new Notification(req.body);
  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error("Notification creation error:", error.message);
    console.error("Validation errors:", error.errors);
    res.status(400).json({
      message: error.message,
      errors: error.errors,
    });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.saveResponse = async (req, res) => {
  try {
    const { source } = req.body;
    console.log("User came from:", source);
    res.status(200).json({ message: "Response saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
