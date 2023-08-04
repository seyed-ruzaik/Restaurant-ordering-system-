const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    const tasks = [];
    const NUM_TASKS = 10; // Number of tasks to seed

    // Loop to create tasks
    for (let i = 0; i < NUM_TASKS; i++) {
      tasks.push({
        title: faker.lorem.sentence(), // Generate a random sentence as the task title
        status: faker.helpers.arrayElement(['completed', 'in-progress', 'not-started']), // Randomly select status
        priority: faker.helpers.arrayElement(['high', 'medium', 'low']), // Randomly select priority
        due_date: faker.date.future(), // Generate a random future date as the due date
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }

    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
