const express = require('express');
const router = express.Router();
const readingGoalController = require('../controllers/readingGoalController');



// Set reading goal
router.post('/', readingGoalController.setReadingGoal);

// Get reading progress
router.get('/progress', readingGoalController.getProgress);

module.exports = router;