'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User has many books and categories
      User.hasMany(models.Book, { foreignKey: 'userId' });
      User.hasMany(models.Category, { foreignKey: 'userId' });
    }

    // Update user's reading goal
    async setReadingGoal(goal) {
      this.readingGoal = goal;
      await this.save();
    }

    // Increment books completed and check if goal is achieved
    async incrementBooksCompleted() {
      this.booksCompleted += 1;
      await this.save();

      // Return true if goal is achieved exactly
      return this.readingGoal && this.booksCompleted === this.readingGoal;
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verificationToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      verificationTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      readingGoal: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      booksCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true
    }
  );
  return User;
};