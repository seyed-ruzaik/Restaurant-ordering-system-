import { Request, Response } from "express";
import {
    createDishHelper,
    updateDishHelper,
    deleteDishHelper,
    getDishByIdHelper,
    getAllDishesHelper,
} from "../helpers/dish.helper";

// Function to create a new dish
export const createDish = async (req: Request, res: Response) => {
    await createDishHelper(req, res); // Call the createDishHelper function from the helper
};

// Function to update an existing dish
export const updateDish = async (req: Request, res: Response) => {
    await updateDishHelper(req, res); // Call the updateDishHelper function from the helper
};

// Function to get a dish by its ID
export const getDish = async (req: Request, res: Response) => {
    try {
        await getDishByIdHelper(req, res); // Call the getDishByIdHelper function from the helper
    } catch (error) {
        res.status(400).send({ message: error.message }); // Send error message if an error occurs
    }
};

// Function to get all dishes
export const getAllDishes = async (req: Request, res: Response) => {
    try {
        await getAllDishesHelper(req, res); // Call the getAllDishesHelper function from the helper
    } catch (error) {
        res.status(400).send({ message: error.message }); // Send error message if an error occurs
    }
};

// Function to delete a dish
export const deleteDish = async (req: Request, res: Response) => {
    try {
        await deleteDishHelper(req, res); // Call the deleteDishHelper function from the helper
    } catch (error) {
        res.status(400).send({ message: error.message }); // Send error message if an error occurs
    }
};
