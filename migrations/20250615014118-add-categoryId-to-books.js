'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.addColumn('Books', 'categoryId',{
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'

      });
     
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.removeColumn('Books', 'categoryId');
     
  }
};
