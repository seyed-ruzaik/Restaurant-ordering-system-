import { Request, Response } from "express";
import {
    createRatingHelper,
    updateRatingHelper,
    deleteRatingHelper,
    getRatingHelper,
    getAllRatingsHelper,
} from "../helpers/rating.helper";

// Controller function to create a new rating
export const createRating = async (req: Request, res: Response) => {
    await createRatingHelper(req, res); // Call the createRatingHelper function from the helper
};

// Controller function to update an existing rating
export const updateRating = async (req: Request, res: Response) => {
    await updateRatingHelper(req, res); // Call the updateRatingHelper function from the helper
};

// Controller function to get a rating by its ID
export const getRating = async (req: Request, res: Response) => {
    try {
        await getRatingHelper(req, res); // Call the getRatingHelper function from the helper
    } catch (error) {
        res.status(400).send({ message: error.message }); // Send error message if an error occurs
    }
};

// Controller function to get all ratings
export const getAllRating = async (req: Request, res: Response) => {
    try {
        await getAllRatingsHelper(req, res); // Call the getAllRatingsHelper function from the helper
    } catch (error) {
        res.status(400).send({ message: error.message }); // Send error message if an error occurs
    }
};

// Controller function to delete a rating
export const deleteRating = async (req: Request, res: Response) => {
    try {
        await deleteRatingHelper(req, res); // Call the deleteRatingHelper function from the helper
    } catch (error) {
        res.status(400).send({ message: error.message }); // Send error message if an error occurs
    }
};
