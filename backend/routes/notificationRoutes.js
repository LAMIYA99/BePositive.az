const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.get("/active", notificationController.getActiveNotification);
router.get("/", notificationController.getNotifications);
router.post("/", notificationController.createNotification);
router.put("/:id", notificationController.updateNotification);
router.delete("/:id", notificationController.deleteNotification);
router.get("/:id/stats", notificationController.getNotificationStats);
router.post("/response", notificationController.saveResponse);

module.exports = router;
