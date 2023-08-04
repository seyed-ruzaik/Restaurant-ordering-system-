const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    const orders = [];
    const NUM_ORDERS = 10000; // Number of orders to seed

    // Loop to create 10,000 orders
    for (let i = 0; i < NUM_ORDERS; i++) {
      orders.push({
        user_id: faker.number.int({ min: 1, max: 50 }), // Replace 1 and 100 with valid user IDs from your database
        status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
        total_amount: faker.number.int({ min: 10, max: 1000 }), // Replace min and max values as needed
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }

    await queryInterface.bulkInsert('orders', orders, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
