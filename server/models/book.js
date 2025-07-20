'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association: Users have many books
      Book.belongsTo(models.User, {foreignKey:'userId'});
      Book.belongsTo(models.Category, { foreignKey: 'categoryId'});
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    year: DataTypes.INTEGER,
    filePath: DataTypes.STRING,
    ebookUrl: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'Books',
    timestamps: true,
  });
  return Book;
};