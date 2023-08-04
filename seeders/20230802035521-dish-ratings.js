const { faker } = require('@faker-js/faker');


module.exports = {
  up: async (queryInterface) => {

    const dishRatings = [];
    const NUM_RATINGS = 10; // Adjust the number of ratings you want to seed

    for (let i = 0; i < NUM_RATINGS; i++) {
      dishRatings.push({
        dish_id: faker.number.int({min: 1, max: 10}), // Select a random dish ID
        user_id: faker.number.int({min: 1, max: 50}), // Select a random user ID
        rating: faker.number.int({ min: 1, max: 5 }), // Assuming ratings are from 1 to 5
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('ratings', dishRatings, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ratings', null, {});
  }
};
