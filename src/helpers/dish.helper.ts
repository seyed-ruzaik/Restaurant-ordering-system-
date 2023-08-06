import { Request, Response } from 'express';
import  Category  from '../models/category';
import Dish from "../models/dish";
import multer from "multer";
import fs from "fs";
import path from "path";
import {getImageUrl} from "./image.helper";

// configures how the files are gonna be stored
const multerConfig = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File,
                           callback: (error: Error | null, destination: string) => void) {
        callback(null, 'uploads/dishes');
    },
    filename: function (req: Request, file: Express.Multer.File,
                        callback: (error: Error | null, filename: string) => void) {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

// File upload middleware using multer with the defined storage
const upload = multer({
    storage: multerConfig,
});

// Create a new dish
export const createDishHelper = async (req: Request, res: Response) => {
    try {
        // Use the multer middleware to handle file upload for dish image
        upload.single('picture')(req, res, async function (err) {
            if (err) {
                return res.status(400).send({ message: 'Error uploading picture', timestamp: new Date() });
            }
            const { name, description, price, category_id} = req.body;
            if (!name || !description || !price) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: 'Request is invalid. Missing required properties',
                    timestamp: new Date() });
            }
            // Check if the category with the provided categoryId exists
            const category = await Category.findByPk(category_id);
            if (!category) {
                // Delete the uploaded file if there was an error during registration
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({ message: 'Category not found', timestamp: new Date() });
            }

            if (err) {
                // Delete the uploaded file if there was an error during registration
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: 'Error uploading image', timestamp: new Date() });
            }

            // Check if the price is not a number
            if (isNaN(price)) {
                // Delete the uploaded file if there was an error during registration
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: "Price must be a valid number", timestamp: new Date() });
            }

            const image = req.file ? req.file.filename : null;

            // Create the new dish and associate it with the category
            await Dish.create({
                name,
                description,
                price,
                image,
                category_id,
            });
            res.status(201).json({ message: 'Dish successfully added' });
        });
    } catch (error) {
        // Delete the uploaded file if there was an error during registration
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Error creating dish', error });
    }
};

// Get all dishes
export const getAllDishesHelper = async (_req: Request, res: Response) => {
    try {
        const dishes: Dish[] = await Dish.findAll({
            limit:  +_req.params.limit,
            offset: +_req.params.offset}); // Retrieve all dishes from the database
        const data: { // Create an array of dish data objects with selected properties
            image: string;
            category_id: number | undefined;
            price: number | undefined;
            name: string | undefined;
            description: string | undefined;
            id: number | undefined;
        }[] = dishes.map((dish) => ({
            id: dish.id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            image: getImageUrl(dish.image, "dish"), // Get the URL of the dish image using getImageUrl function
            category_id: dish.category_id
        }));
        res.status(200).json(data); // Send the array of dish data objects as the response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dishes', error }); // Send an error message if there's an issue with fetching dishes
    }
};

// Get a dish by ID
export const getDishByIdHelper = async (req: Request, res: Response) => {
    const data = req?.params;
    const dishId = data.id;
    try {
        const dish = await Dish.findByPk(dishId);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found', timestamp: new Date() });
        }
        const Data = {
            id: dish.id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            image: getImageUrl(dish.image, "dish"),
            category_id: dish.category_id
        };

        res.status(200).json(Data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dish', error });
    }
};

// Update a dish by ID
export const updateDishHelper = async (req: Request, res: Response) => {
    try {
        // Use the multer middleware to handle file upload for dish image
        upload.single('picture')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: 'Error uploading image', timestamp: new Date() });
            }
            const {dish_id, name, description, price, category_id } = req.body;
            if (!name || !description || !price) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: 'Request is invalid. Missing required properties',
                    timestamp: new Date() });
            }
            // Check if the dish with the provided ID exists
            const existingDish = await Dish.findByPk(dish_id);
            if (!existingDish) {
                // Delete the uploaded file if there was an error
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({ message: 'Dish not found', timestamp: new Date() });
            }

            // Check if the category with the provided categoryId exists
            const category = await Category.findByPk(category_id);
            if (!category) {
                // Delete the uploaded file if there was an error
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({ message: 'Category not found', timestamp: new Date() });
            }

            // Check if the price is not a number
            if (isNaN(price)) {
                // Delete the uploaded file if there was an error
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: "Price must be a valid number", timestamp: new Date() });
            }

            // Update the dish properties and associate it with the new category
            existingDish.name = name;
            existingDish.description = description;
            existingDish.price = price;
            existingDish.image = req.file ? req.file.filename : existingDish.image; // Keep the existing image if no new image is provided
            existingDish.category_id = category_id;
            await existingDish.save();

            res.status(200).json({ message: 'Dish successfully updated' });
        });
    } catch (error) {
        // Delete the uploaded file if there was an error during updating
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Error updating dish', error });
    }
};

// Delete a dish by ID
export const deleteDishHelper = async (req: Request, res: Response) => {
    const data = req?.params;
    const dishId = data.id;
    try {
        // Check if the dish with the provided ID exists
        const existingDish = await Dish.findByPk(dishId);
        if (!existingDish) {
            return res.status(404).json({ message: 'Dish not found', timestamp: new Date() });
        }

        // Delete the dish
        await existingDish.destroy();
        res.status(204).json({ message: 'Dish deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting dish', error });
    }
};
