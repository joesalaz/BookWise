var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// API routes for user data
router.get('/api', userController.getUserData);
router.put('/api', userController.updateProfile);
router.get('/api/stats', userController.getUserStats);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
