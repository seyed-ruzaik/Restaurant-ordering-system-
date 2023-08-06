// Import the required controllers from the user.controller file
import {
    loginController,
    registerController,
    getUserController
} from "../controllers/user.controller";
import {validateSchemaMiddleware} from "../middlewares/ajv-handler";
import {registerSchema, loginSchema} from "../schema/user.schema";
// Import the express module to create a router
import express from "express";

// Create a new express router
const router = express.Router();

// Import the authentication middleware to handle authorization
const authentication = require('../middlewares/authorization');

// Route to handle user registration
router.post("/register", validateSchemaMiddleware(registerSchema), registerController);

// Route to handle user login
router.post("/login", validateSchemaMiddleware(loginSchema), loginController);

// Route to get user information (requires JWT authorization)
router.get('/info/limit/:limit/offset/:offset', authentication.verifyJWT, getUserController);

// Export the router as userRoutes
export const userRoutes = router;
