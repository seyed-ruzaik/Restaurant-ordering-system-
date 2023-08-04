const { faker } = require('@faker-js/faker');


module.exports = {
  up: async (queryInterface) => {
    const dishes = [];
    const NUM_DISHES = 10; // Adjust the number of dishes you want to seed

    for (let i = 0; i < NUM_DISHES; i++) {
      dishes.push({
        name: faker.lorem.word(3),
        description: faker.lorem.words(10),
        price: faker.finance.amount(5, 30, 2),
        image: faker.image.urlLoremFlickr({ category: 'food' }), // Generate a random food image URL
        category_id: faker.number.int({ min: 1, max: 10 }), // Assuming there are 10 categories seeded
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('dishes', dishes, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('dishes', null, {});
  }
};
