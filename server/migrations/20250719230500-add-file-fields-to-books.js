'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Books', 'filePath', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Books', 'ebookUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Books', 'filePath');
    await queryInterface.removeColumn('Books', 'ebookUrl');
  }
};
