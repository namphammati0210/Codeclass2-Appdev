'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        description: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'trainingStaff',
        description: 'TrainingStaff',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'trainer',
        description: 'trainer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'trainee',
        description: 'trainee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'student',
        description: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {  
    await queryInterface.bulkDelete('Roles', [
      {
        name: 'admin',
        description: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'trainingStaff',
        description: 'TrainingStaff',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'trainer',
        description: 'trainer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'trainee',
        description: 'trainee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'student',
        description: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  }
};
