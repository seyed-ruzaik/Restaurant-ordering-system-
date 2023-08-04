const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => {
    const users = [];
    const NUM_USERS = 50; // Adjust the number of users you want to seed

    for (let i = 0; i < NUM_USERS; i++) {
      users.push({
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('Abc@123'),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
