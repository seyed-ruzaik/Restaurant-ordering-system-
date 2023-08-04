export const taskSchema = {
    type: 'object',
    properties: {
        title: { type: 'string', minLength: 3 },
        status: { type: 'string', minLength: 3 },
        priority: {type: 'string', minLength: 3},
        due_date: { type: 'string', format: 'date' },
    },
    required: ['title', 'status', 'priority', 'due_date'],
};
