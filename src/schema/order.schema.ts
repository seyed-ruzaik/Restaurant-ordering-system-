export const placeOrderSchema = {
    type: 'object',
    properties: {
        user_id: { type: 'integer', minimum: 1 }, // Assuming user_id is a positive integer
        items: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    dish_id: { type: 'integer', minimum: 1 }, // Assuming dish_id is a positive integer
                    quantity: { type: 'integer', minimum: 1, maximum: 5 }, // Assuming quantity is a positive integer between 1 and 5
                },
                required: ['dish_id', 'quantity'],
            },
        },
    },
    required: ['user_id', 'items'],
};

export const orderStatusSchema = {
    type: 'object',
    properties: {
        status: { type: 'string', minLength: 3 },
    },
    required: ['status'],
};
