'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     
    
      await queryInterface.bulkInsert('Users', [{
        name: 'Demo',
        lastName: 'User',
        username:'demouser',
        email: 'demo@eaxample.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date()
       
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Users', { username: 'demouser' }, {});
     
  }
};
