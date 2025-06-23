'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.addColumn('Categories', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        OnDelete: 'SET NULL'

      });
     
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('Categories', 'userId');
     
  }
};
