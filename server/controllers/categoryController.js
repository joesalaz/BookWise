const { Category, Book } = require('../models');

// Get all categories for the current user
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { userId: req.session.user.id },
      order: [['name', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const trimmedName = name.trim();
    
    // Check for duplicate category name for this user
    const existingCategory = await Category.findOne({
      where: { name: trimmedName, userId: req.session.user.id }
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category name already exists. Choose category from the dropdown.' });
    }

    const category = await Category.create({
      name: trimmedName,
      userId: req.session.user.id
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const trimmedName = name.trim();

    const category = await Category.findOne({
      where: { id, userId: req.session.user.id }
    });

    if (!category) {
      return res.status(404).json({ error: "Category doesn't exist. It must have already been deleted. Create new category." });
    }

    // Check for duplicate category name (excluding current category)
    const existingCategory = await Category.findOne({
      where: { 
        name: trimmedName, 
        userId: req.session.user.id,
        id: { [require('sequelize').Op.ne]: id }
      }
    });

    if (existingCategory) {
      return res.status(400).json({ error: 'Category name already exists. Choose category from the dropdown.' });
    }

    await category.update({ name: trimmedName });
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete a category
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
    const bookCount = await Book.count({
      where: { categoryId: id }
    });

    if (bookCount > 0) {
      return res.status(400).json({ 
        error: `Cannot delete category. It contains ${bookCount} book(s).` 
      });
    }

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
