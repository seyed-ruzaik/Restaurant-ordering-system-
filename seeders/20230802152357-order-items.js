const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    const orderItems = [];
    const NUM_ORDER_ITEMS = 12000; // Number of order items to seed

    // Loop to create 30,000 order items
    for (let i = 0; i < NUM_ORDER_ITEMS; i++) {
      orderItems.push({
        order_id: faker.number.int({ min: 1, max: 10000 }), // Replace 1 and 10000 with valid order IDs from your database
        dish_id: faker.number.int({ min: 1, max: 10 }), // Replace 1 and 100 with valid dish IDs from your database
        quantity: faker.number.int({ min: 1, max: 5 }), // Assuming quantity is from 1 to 5
        price: faker.number.int({ min: 10, max: 100 }), // Replace min and max values as needed
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }

    await queryInterface.bulkInsert('orderitems', orderItems, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('orderitems', null, {});
  }
};
