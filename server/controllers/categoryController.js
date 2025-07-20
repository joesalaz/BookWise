const { Category, Book } = require('../models');
const { sequelize } = require('../models');

// Get all categories for user
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { userId: req.session.user.id },
      include: [{
        model: Book,
        attributes: []
      }],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('Books.id')), 'bookCount']
        ]
      },
      group: ['Category.id'],
      order: [['name', 'ASC']]
    });
    
    // Convert bookCount from string to number
    const formattedCategories = categories.map(cat => ({
      ...cat.toJSON(),
      bookCount: parseInt(cat.dataValues.bookCount) || 0
    }));
    
    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load categories' });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name required' });
    }

    // Check if category already exists
    const existing = await Category.findOne({
      where: { 
        name: name.trim(),
        userId: req.session.user.id 
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    // Create category
    const category = await Category.create({
      name: name.trim(),
      userId: req.session.user.id
    });

    // Add notification
    const notificationController = require('./notificationController');
    const NotificationTypes = require('../classes/NotificationTypes');
    
    notificationController.createNotification(
      req.session.user.id,
      NotificationTypes.TYPES.CATEGORY_CREATED,
      { categoryName: category.name }
    ).catch(err => console.log('Notification failed'));

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name required' });
    }
    
    const category = await Category.findOne({
      where: { id, userId: req.session.user.id }
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    category.name = name.trim();
    await category.save();
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findOne({
      where: { id, userId: req.session.user.id }
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    // Check if category has books
    const bookCount = await Book.count({ where: { categoryId: id } });
    if (bookCount > 0) {
      return res.status(400).json({ 
        error: `Can't delete category with ${bookCount} book${bookCount > 1 ? 's' : ''}. Remove books first.` 
      });
    }
    
    await category.destroy();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
