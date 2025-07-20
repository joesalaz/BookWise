const { User, Book, Category } = require('../models');

// Get user data with stats for API
exports.getUserData = async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    // Get user from database (session data might be outdated)
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get counts using simple queries
    const bookCount = await Book.count({ where: { userId } });
    const categoryCount = await Category.count({ where: { userId } });
    
    // Get favorite category (first one for now)
    const firstCategory = await Category.findOne({ 
      where: { userId },
      order: [['name', 'ASC']]
    });
    
    const favoriteCategory = firstCategory ? firstCategory.name : 'None';

    const userData = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      readingGoal: user.readingGoal,
      booksCompleted: user.booksCompleted,
      stats: {
        bookCount: bookCount,
        categoryCount: categoryCount,
        favoriteCategory: favoriteCategory,
        reviewCount: 0 // TODO: implement when reviews are added
      }
    };

    res.json(userData);
  } catch (error) {
    console.log('Error getting user data:', error);
    res.status(500).json({ error: 'Failed to load user data' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { name, lastName, email } = req.body;

    // Basic validation
    if (!name || !lastName || !email) {
      return res.status(400).json({ error: 'Name, last name and email required' });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({
      where: { 
        email: email.trim(),
        id: { [require('sequelize').Op.ne]: userId }
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Update user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name.trim();
    user.lastName = lastName.trim(); 
    user.email = email.trim();
    await user.save();

    // Update session data
    req.session.user.email = user.email;

    res.json({ 
      message: 'Profile updated!',
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.log('Error updating profile:', error);
    res.status(500).json({ error: 'Update failed' });
  }
};

// Get user stats only
exports.getUserStats = async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    // Simple count queries
    const bookCount = await Book.count({ where: { userId } });
    const categoryCount = await Category.count({ where: { userId } });
    
    // Get first category as favorite
    const firstCategory = await Category.findOne({
      where: { userId },
      order: [['name', 'ASC']]
    });

    const favoriteCategory = firstCategory ? firstCategory.name : 'None';

    res.json({
      bookCount,
      categoryCount,
      favoriteCategory,
      reviewCount: 0 // TODO: implement reviews
    });
  } catch (error) {
    console.log('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to load stats' });
  }
};
