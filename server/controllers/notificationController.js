const { Notification } = require('../models');
const NotificationTypes = require('../classes/NotificationTypes');
const moment = require('moment');

// Get notifications for API
exports.getNotificationsApi = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.session.user.id },
      order: [['createdAt', 'DESC']],
      limit: 5 // Get only the 5 most recent notifications
    });

    // Format notifications for display
    const formattedNotifications = notifications.map(notification => ({
      id: notification.id,
      message: notification.message,
      time: moment(notification.createdAt).fromNow(),
      isRead: notification.isRead
    }));

    // Get unread count
    const unreadCount = await Notification.count({
      where: { 
        userId: req.session.user.id,
        isRead: false
      }
    });

    res.json({ 
      notifications: formattedNotifications,
      unreadCount
    });
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({ error: 'Failed to get notifications' });
  }
};

// Get notifications for page
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.session.user.id },
      order: [['createdAt', 'DESC']]
    });

    // Format notifications for display
    const formattedNotifications = notifications.map(notification => ({
      id: notification.id,
      message: notification.message,
      time: moment(notification.createdAt).fromNow(),
      isRead: notification.isRead
    }));

    res.render('notifications', { 
      title: 'BookWise',
      notifications: formattedNotifications
    });
  } catch (error) {
    console.error('Error loading notifications:', error);
    res.status(500).render('error', { error: 'Failed to load notifications' });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.update(
      { isRead: true },
      { 
        where: { 
          id,
          userId: req.session.user.id 
        }
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};

// Create notification
exports.createNotification = async (userId, type, data) => {
  try {
    const message = NotificationTypes.getMessage(type, data);
    await Notification.create({
      userId,
      message,
      type,
      isRead: false
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};