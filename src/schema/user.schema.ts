// loginHelper Schema
export const loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 7 }
    },
    required: ['email', 'password']
};

// registerHelper Schema
export const registerSchema = {
    type: 'object',
    properties: {
        full_name: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 7 }
    },
    required: ['full_name', 'email', 'password']
};
