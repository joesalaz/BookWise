'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'John',
      lastName: 'Doe',
      username: 'demouser',
      email: 'demo@bookwise.com',
      password: await bcrypt.hash('demo-password', 10),
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { username: 'demouser' }, {});
  }
};