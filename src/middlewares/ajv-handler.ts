import { Request, Response, NextFunction } from "express";
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Create an AJV instance
const ajv = new Ajv({ allErrors: true, coerceTypes: true });

// Add support for common formats (e.g. - date)
addFormats(ajv);

// Middleware function for schema validation
export function validateSchemaMiddleware(schema: any) {
    const validate = ajv.compile(schema);

    return (req: Request, res: Response, next: NextFunction) => {
        const data = req.body;

        // Validate the request body against the provided schema
        const isValid = validate(data);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // If validation is successful, continue to the next middleware/controller
        next();
    };
}
