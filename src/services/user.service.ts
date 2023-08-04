import { Request, Response } from "express";
import User from "../models/user";
import { loginHelper, registerHelper } from "../helpers/user.helper";
import { getData } from "../validations/validator";

// Register a new user
export const register = async (req: Request, res: Response) => {
    await registerHelper(req, res);
};

// User login
export const login = async (req: Request, res: Response) => {
    await loginHelper(req, res);
};

// Get user information
export const getUser = async (req: Request, res: Response) => {
    try {
        // Call the getData function to retrieve user data from the User model
        await getData(req, res, User);
    } catch (error) {
        res.status(400).send({ message: error.message }); // Send error message if an error occurs
    }
};
