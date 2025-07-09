const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');

// Apply authentication middleware to all profile routes
router.use(requireAuth);

// GET /profile - Render profile page
router.get('/', async (req, res) => {
  try {
    const user = req.session.user;
    // TODO: Fetch user's actual data including stats, books, categories, reviews
    // For now, using placeholder data
    
    res.render('profile', { 
      title: 'BookWise',
      user: user,
      // TODO: Replace with actual data from database
      stats: {
        bookCount: 42,
        favoriteCategory: 'Fiction',
        reviewCount: 7
      }
    });
  } catch (error) {
    console.error('Error loading profile page:', error);
    res.status(500).render('error', { error: 'Failed to load profile' });
  }
});

// POST /profile - Update profile
router.post('/', async (req, res) => {
  try {
    // TODO: Implement profile update logic
    const { name, email, bio } = req.body;
    
    // Validate input
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // TODO: Update user in database
    // await User.update({ name, email, bio }, { where: { id: req.session.user.id } });
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
