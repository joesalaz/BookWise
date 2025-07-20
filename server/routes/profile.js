const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Update reading goal
router.post('/reading-goal', async (req, res) => {
    try {
        const { readingGoal } = req.body;
        
        // Basic validation
        if (!readingGoal || readingGoal < 1) {
            return res.status(400).json({ 
                message: 'Please enter a valid reading goal' 
            });
        }

        // Update user's reading goal
        await req.session.user.setReadingGoal(readingGoal);
        
        res.json({ message: 'Reading goal updated successfully' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to update reading goal' 
        });
    }
});

// GET /profile - Render profile page
router.get('/', async (req, res) => {
  try {
    const user = req.session.user;
    
    // For now, use placeholder stats until frontend is working
    const stats = {
      bookCount: 0,
      favoriteCategory: 'None',
      reviewCount: 0
    };
    
    res.render('profile', { 
      title: 'BookWise',
      user: user,
      stats: stats
    });
  } catch (error) {
    console.log('Error loading profile page:', error);
    res.status(500).render('error', { error: 'Failed to load profile' });
  }
});

// POST /profile - Update profile using controller
router.post('/', userController.updateProfile);

module.exports = router;
