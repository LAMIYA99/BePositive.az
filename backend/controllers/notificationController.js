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
    try {
      if (req && req.io) req.io.emit("notificationCreated", newNotification);
    } catch (emitErr) {
      console.error("Failed to emit notificationCreated:", emitErr);
    }
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
    try {
      if (req && req.io)
        req.io.emit("notificationUpdated", updatedNotification);
    } catch (emitErr) {
      console.error("Failed to emit notificationUpdated:", emitErr);
    }
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
    if (!notificationId || !source) {
      return res
        .status(400)
        .json({ message: "notificationId and source are required" });
    }

    const updated = await Notification.findByIdAndUpdate(
      notificationId,
      { $push: { responses: { value: source } } },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Notification not found" });

    try {
      if (req && req.io) req.io.emit("notificationUpdated", updated);
    } catch (emitErr) {
      console.error(
        "Failed to emit notificationUpdated after response:",
        emitErr
      );
    }

    res.status(200).json({ message: "Response saved" });
  } catch (error) {
    console.error("saveResponse error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getNotificationStats = async (req, res) => {
  try {
    const id = req.params.id;
    const notification = await Notification.findById(id);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    const counts = {};
    const optionValues = new Set(
      (notification.options || []).map((o) => o.value)
    );
    const customs = {};

    (notification.options || []).forEach((o) => {
      counts[o.value] = 0;
    });

    (notification.responses || []).forEach((r) => {
      if (optionValues.has(r.value)) {
        counts[r.value] = (counts[r.value] || 0) + 1;
      } else {
        customs[r.value] = (customs[r.value] || 0) + 1;
      }
    });

    const total = (notification.responses || []).length;
    const customResponses = Object.entries(customs).map(([value, count]) => ({
      value,
      count,
    }));

    res.status(200).json({ counts, total, customResponses });
  } catch (error) {
    console.error("getNotificationStats error:", error);
    res.status(500).json({ message: error.message });
  }
};
