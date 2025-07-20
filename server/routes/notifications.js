const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');


// GET /notifications - Show all notifications page
router.get('/', notificationController.getNotifications);

// Add the new API route for getting notifications
router.get('/api', notificationController.getNotificationsApi);

// Mark notification as read
router.put('/api/:id/read', notificationController.markAsRead);

module.exports = router;