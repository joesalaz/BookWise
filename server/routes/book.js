const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Get a specific book
router.get('/:id', function(req, res, next){
    res.render('book', {title: 'View Book'});
});

// Toggle book completion status
router.post('/:id/toggle-completion', bookController.toggleBookCompletion);

module.exports = router;