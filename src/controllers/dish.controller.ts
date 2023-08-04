import { Request, Response } from "express";
import {
    createDish,
    updateDish,
    deleteDish,
    getDish,
    getAllDishes,
} from "../services/dish.service";

// Controller function to create a new dish
export const createDishController = async (req: Request, res: Response) => {
    try {
        await createDish(req, res); // Call the createDish service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to update an existing dish
export const updateDishController = async (req: Request, res: Response) => {
    try {
        await updateDish(req, res); // Call the updateDish service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to delete a dish
export const deleteDishController = async (req: Request, res: Response) => {
    try {
        await deleteDish(req, res); // Call the deleteDish service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to get a dish by its ID
export const getDishController = async (req: Request, res: Response) => {
    try {
        await getDish(req, res); // Call the getDish service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to get all dishes
export const getAllDishController = async (req: Request, res: Response) => {
    try {
        await getAllDishes(req, res); // Call the getAllDishes service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};
