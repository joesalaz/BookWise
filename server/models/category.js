'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Define model associations
     * @param {object} models - The sequelize models
     */
    static associate(models) {
      Category.belongsTo(models.User, {foreignKey: 'userId'});
      Category.hasMany(models.Book, { foreignKey: 'categoryId'});
    }

    /**
     * Retrieve all categories for a specific user
     * @param {number} userId - The ID of the user
     * @returns {Promise<Category[]>} Array of categories
     */
    static async getUserCategories(userId) {
      return this.findAll({
        where: { userId },
        order: [['name', 'ASC']]
      });
    }

    /**
     * Create a new category for a user
     * @param {string} name - The category name
     * @param {number} userId - The ID of the user
     * @returns {Promise<Category>} The created category
     * @throws {Error} If validation fails or category exists
     */
    static async addCategory(name, userId) {
      // Input validation
      if (!name || !userId) {
        throw new Error('Name and user ID are required');
      }

      const cleanName = name.trim();
      
      // Check for existing category
      const existingCategory = await this.findOne({
        where: { name: cleanName, userId }
      });

      if (existingCategory) {
        throw new Error('Category already exists');
      }

      // Create and return new category
      return this.create({ name: cleanName, userId });
    }

    /**
     * Update an existing category
     * @param {number} id - The category ID
     * @param {string} name - The new category name
     * @param {number} userId - The ID of the user
     * @returns {Promise<Category>} The updated category
     * @throws {Error} If category not found or validation fails
     */
    static async updateCategory(id, name, userId) {
      // Input validation
      if (!name || !id || !userId) {
        throw new Error('Category ID, name, and user ID are required');
      }

      const cleanName = name.trim();

      // Find existing category
      const category = await this.findOne({
        where: { id, userId }
      });

      if (!category) {
        throw new Error('Category not found');
      }

      // Check for name conflicts
      const duplicateCategory = await this.findOne({
        where: { 
          name: cleanName,
          userId,
          id: { [require('sequelize').Op.ne]: id }
        }
      });

      if (duplicateCategory) {
        throw new Error('Category name already in use');
      }

      // Update and return category
      category.name = cleanName;
      await category.save();
      return category;
    }

    /**
     * Delete a category if it has no books
     * @param {number} id - The category ID
     * @param {number} userId - The ID of the user
     * @returns {Promise<boolean>} True if successful
     * @throws {Error} If category not found or has books
     */
    static async deleteCategory(id, userId) {
      // Find category
      const category = await this.findOne({
        where: { id, userId }
      });

      if (!category) {
        throw new Error('Category not found');
      }

      // Check for existing books
      const bookCount = await sequelize.models.Book.count({
        where: { categoryId: id }
      });

      if (bookCount > 0) {
        throw new Error(`Cannot delete category with ${bookCount} book(s)`);
      }

      await category.destroy();
      return true;
    }
  }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    timestamps: true
  });

  return Category;
};