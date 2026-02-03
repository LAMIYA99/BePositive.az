const Notification = require("../models/Notification");

exports.getActiveNotification = async (req, res) => {
  console.log("GET /api/notifications/active called");
  try {
    const notification = await Notification.findOne({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();
    console.log(
      "Fetched active notification:",
      notification ? notification._id : "none",
    );
    res.status(200).json(notification);
  } catch (error) {
    console.error("Error in getActiveNotification:", error);
    res
      .status(500)
      .json({
        message: "Error fetching active notification",
        error: error.message,
      });
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
  const notification = new Notification(req.body);
  try {
    const newNotification = await notification.save();
    if (req.io) req.io.emit("notificationCreated", newNotification);
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (req.io) req.io.emit("notificationUpdated", updatedNotification);
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
    const { source, notificationId } = req.body;
    const updated = await Notification.findByIdAndUpdate(
      notificationId,
      { $push: { responses: { value: source } } },
      { new: true },
    );
    if (req.io) req.io.emit("notificationUpdated", updated);
    res.status(200).json({ message: "Response saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotificationStats = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });
    const counts = {};
    const total = notification.responses.length;
    res.status(200).json({ counts, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
