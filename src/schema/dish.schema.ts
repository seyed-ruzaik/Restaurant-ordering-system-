export const deleteDishSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 },
    },
    required: ['id'],
}

export const getDishSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 },
    },
    required: ['id'],
}

