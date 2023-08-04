import { Request, Response } from "express";
import { login, register, getUser } from "../services/user.service";

// Controller function for user login
export const loginController = async (req: Request, res: Response) => {
    try {
        await login(req, res); // Call the login service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
}

// Controller function for user registration
export const registerController = async (req: Request, res: Response) => {
    try {
        await register(req, res); // Call the register service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
}

// Controller function to get user information
export const getUserController = async (req: Request, res: Response) => {
    try {
        await getUser(req, res); // Call the getUser service function to retrieve user data
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
}
