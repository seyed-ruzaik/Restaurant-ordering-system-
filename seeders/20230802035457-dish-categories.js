const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    const dishCategories = [];
    const NUM_CATEGORIES = 10; // Adjust the number of categories you want to seed

    for (let i = 0; i < NUM_CATEGORIES; i++) {
      dishCategories.push({
        name: faker.lorem.word(5),
        image: faker.image.urlLoremFlickr({ category: 'food' }), // Generate a random food image URL
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('categories', dishCategories, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
