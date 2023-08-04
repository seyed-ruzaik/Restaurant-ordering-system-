import { Request, Response } from "express";
import {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory,
} from "../services/category.service";

// Controller function to create a new category
export const createCategoryController = async (req: Request, res: Response) => {
    try {
        await createCategory(req, res); // Call the createCategory service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to update an existing category
export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        await updateCategory(req, res); // Call the updateCategory service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to delete a category
export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        await deleteCategory(req, res); // Call the deleteCategory service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to get a category by its ID
export const getCategoryController = async (req: Request, res: Response) => {
    try {
        await getCategory(req, res); // Call the getCategory service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to get all categories
export const getAllCategoryController = async (req: Request, res: Response) => {
    try {
        await getAllCategory(req, res); // Call the getAllCategory service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};
