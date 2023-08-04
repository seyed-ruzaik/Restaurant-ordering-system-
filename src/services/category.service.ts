import {Request, Response} from "express";
import {createCategoryHelper, updateCategoryHelper, getCategoryByIdHelper,
    getAllCategoriesHelper, deleteCategoryHelper} from "../helpers/category.helper";

// The createCategory function is responsible for handling the creation of a new category.
export const createCategory = async (req: Request, res: Response) => {
    await createCategoryHelper(req, res); // Call the createCategoryHelper function to perform the category creation logic.
};

// The `updateCategory` function handles the update of an existing category.
export const updateCategory = async (req: Request, res: Response) => {
    await updateCategoryHelper(req, res); // Call the updateCategoryHelper function to perform the category update logic.
};

// The getCategory function retrieves a category based on its ID.
export const getCategory = async (req: Request, res: Response) => {
    try {
        await getCategoryByIdHelper(req, res); // Call the getCategoryByIdHelper function to get the category by ID.
    } catch (error) {
        res.status(400).send({ message: error.message }); // If an error occurs, send an error message back to the client with a status code of 400.
    }
};

// The getAllCategory function retrieves all categories.
export const getAllCategory = async (req: Request, res: Response) => {
    try {
        await getAllCategoriesHelper(req, res); // Call the getAllCategoriesHelper function to retrieve all categories.
    } catch (error) {
        res.status(400).send({ message: error.message }); // If an error occurs, send an error message back to the client with a status code of 400.
    }
};

// The deleteCategory function deletes a category based on its ID.
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        await deleteCategoryHelper(req, res); // Call the deleteCategoryHelper function to delete the category by ID.
    } catch (error) {
        res.status(400).send({ message: error.message }); // If an error occurs, send an error message back to the client with a status code of 400.
    }
};


