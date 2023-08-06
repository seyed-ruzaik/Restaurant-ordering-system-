// createRatingHelper Schema
export const createRatingSchema = {
    type: 'object',
    properties: {
        dish_id: { type: 'integer', minimum: 1 },
        user_id: { type: 'integer', minimum: 1 },
        rating: { type: 'number', minimum: 1, maximum: 5 }
    },
    required: ['dish_id', 'user_id', 'rating']
};

// updateRatingHelper Schema
export const updateRatingSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 },
        rating: { type: 'number', minimum: 1, maximum: 5 }
    },
    required: ['id', 'rating']
};
