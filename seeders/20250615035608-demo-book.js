'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Query for the demo user's id
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE username = 'demouser';`
    );
    //users is an array of results: users[0][0].id gets the id of the firs user
    const userId = users[0][0].id;


    //Query for the category's id
    const categories = await queryInterface.sequelize.query(
      `SELECT id FROM Categories WHERE name = 'Fiction';`

    );
    const categoryId = categories[0][0].id;

    //Checking if both user and category exist
    if(!userId) throw new Error("Demo user not found");
    if (!categoryId) throw new Error("Category 'Fiction' not found.");
   
     await queryInterface.bulkInsert('Books', [{
       title: 'Demo Book',
       author: 'Jose Salazar',
       year: 2024,
       userId: userId,
       categoryId: categoryId,
       createdAt: new Date(),
       updatedAt: new Date()

      }], {});
    
  },

  async down (queryInterface, Sequelize) {
   
       await queryInterface.bulkDelete('Books', { title: 'Demo Book' }, {});
     
  }
};
