const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const requireAuth = require('../middleware/auth');

// Apply authentication middleware to all category routes
router.use(requireAuth);

// GET /categories - Render categories page
router.get('/',  async (req, res) => {
  try {
    const categories = await require('../models').Category.findAll({
      where: { userId: req.session.user.id },
      order: [['name', 'ASC']]
    });
    res.render('categories', { 
      title: 'BookWise',
      categories: categories
    });
  } catch (error) {
    console.error('Error loading categories page:', error);
    res.status(500).render('error', { error: 'Failed to load categories' });
  }
});

// API routes for AJAX operations
router.get('/api', categoryController.getCategories);
router.post('/api', categoryController.createCategory);
router.put('/api/:id', categoryController.updateCategory);
router.delete('/api/:id', categoryController.deleteCategory);

module.exports = router;
