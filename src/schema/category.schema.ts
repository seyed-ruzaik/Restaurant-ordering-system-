export const deleteCategorySchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 },
    },
    required: ['id'],
}

export const getCategorySchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 },
    },
    required: ['id'],
}

