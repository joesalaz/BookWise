const { Category } = require('../models');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.getUserCategories(req.session.user.id);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Could not get categories' });
  }
};

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.addCategory(name, req.session.user.id);
    res.status(201).json(category);
  } catch (error) {
    // Check if it's a validation error
    if (error.message.includes('required') || error.message.includes('exists')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Could not create category' });
    }
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const category = await Category.updateCategory(id, name, req.session.user.id);
    res.json(category);
  } catch (error) {
    // Send appropriate error message
    if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes('required') || error.message.includes('in use')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Could not update category' });
    }
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.deleteCategory(id, req.session.user.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    // Send appropriate error message
    if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else if (error.message.includes('Cannot delete')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Could not delete category' });
    }
  }
};
