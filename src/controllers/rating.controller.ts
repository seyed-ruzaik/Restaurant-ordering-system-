import { Request, Response } from "express";
import {
    createRating,
    updateRating,
    deleteRating,
    getRating,
    getAllRating,
} from "../services/rating.service";

// Controller function to create a new rating
export const createRatingController = async (req: Request, res: Response) => {
    try {
        await createRating(req, res); // Call the createRating service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to update an existing rating
export const updateRatingController = async (req: Request, res: Response) => {
    try {
        await updateRating(req, res); // Call the updateRating service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to delete a rating
export const deleteRatingController = async (req: Request, res: Response) => {
    try {
        await deleteRating(req, res); // Call the deleteRating service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to get a rating by its ID
export const getRatingController = async (req: Request, res: Response) => {
    try {
        await getRating(req, res); // Call the getRating service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to get all ratings
export const getAllRatingController = async (req: Request, res: Response) => {
    try {
        await getAllRating(req, res); // Call the getAllRating service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};
