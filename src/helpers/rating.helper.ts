import { Request, Response } from "express";
import Rating from "../models/rating";
import Dish from "../models/dish";
import User from "../models/user";

const MIN_RATING = 1; //set minimum rating
const MAX_RATING = 5; //set maximum rating

// Create a new rating
export const createRatingHelper = async (req: Request, res: Response) => {
    try {
        const { dish_id, user_id, rating } = req.body;

        // Check if the dish with the provided dishId exists
        const dish = await Dish.findByPk(dish_id);
        const user = await User.findByPk(user_id)
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found', timestamp: new Date() });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found', timestamp: new Date() });
        }

        // Check if the rating is not a number
        if (isNaN(rating)) {
            return res.status(400).json({ message: "Rating must be a valid number", timestamp: new Date() });
        }

        // Check if the rating is within the valid range (1 to 5)
        if (rating < MIN_RATING || rating > MAX_RATING) {
            return res.status(400).json({ message: "Rating must be between 1 and 5", timestamp: new Date() });
        }

        // Create the new rating and associate it with the dish
        await Rating.create({
            dish_id,
            user_id,
            rating,
        });
        res.status(201).json({ message: 'Rating successfully added' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating rating', error });
    }
};

// Get a specific rating by ID
export const getRatingHelper = async (req: Request, res: Response) => {
    try {
        const data = req?.body;
        const id = data.id;
        const rating = await Rating.findByPk(id);

        if (!rating) {
            return res.status(404).json({ message: 'Rating not found', timestamp: new Date() });
        }

        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving rating', error });
    }
};

// Get all ratings
export const getAllRatingsHelper = async (req: Request, res: Response) => {
    try {
        const ratings = await Rating.findAll();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ratings', error });
    }
};

// Update a rating by ID
export const updateRatingHelper = async (req: Request, res: Response) => {
    try {
        const { id, rating } = req.body;

        const updatedRating = await Rating.update({ rating }, { where: { id } });

        if (updatedRating[0] === 0) {
            return res.status(404).json({ message: 'Rating not found', timestamp: new Date() });
        }

        // Check if the rating is not a number
        if (isNaN(rating)) {
            return res.status(400).json({ message: "Rating must be a valid number", timestamp: new Date() });
        }

        // Check if the rating is within the valid range (1 to 5)
        if (rating < MIN_RATING || rating > MAX_RATING) {
            return res.status(400).json({ message: "Rating must be between 1 and 5", timestamp: new Date() });
        }

        res.status(200).json({ message: 'Rating updated successfully', timestamp: new Date() });
    } catch (error) {
        res.status(500).json({ message: 'Error updating rating', error });
    }
};

// Delete a rating by ID
export const deleteRatingHelper = async (req: Request, res: Response) => {
    try {
        const data = req?.body;
        const id = data.id;

        const deletedCount = await Rating.destroy({ where: { id } });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Rating not found', timestamp: new Date() });
        }

        res.status(204).json({ message: 'Rating deleted successfully', timestamp: new Date() });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting rating', error });
    }
};
