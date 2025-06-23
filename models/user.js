'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association: User has many books and categories
      User.hasMany(models.Book, { foreignKey:'userId'});
      User.hasMany(models.Category, { foreignKey: 'userId'});
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};