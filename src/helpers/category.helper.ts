import {Request, Response} from "express";
import  Category  from '../models/category';
import fs from 'fs';
import multer from "multer";
import path from "path";
import {getImageUrl} from "./image.helper";

// configures how the files are gonna be stored
const multerConfig = multer.diskStorage({
    destination: function (req: Express.Request, file: Express.Multer.File,
                           callback: (error: Error | null, destination: string) => void) {
        callback(null, 'uploads/categories');
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

// Create a new category with image upload support
export const createCategoryHelper = async (req: Request, res: Response) => {
    // Use the multer middleware to handle file upload
    upload.single('picture')(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'Error uploading image', timestamp: new Date() });
        }

        // Extract category data from the request body
        const { name } = req.body;
        const image = req.file ? req.file.filename : null;

        try {
            if (name == null || name == ""){ //checking if the name is empty or not
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: 'Category name not provided', timestamp: new Date() });
            }
            if (image == null){ //checking if the image is provided or not
                return res.status(400).json({ message: 'Image not provided', timestamp: new Date() });
            }

            await Category.create({ name, image });
            // Send a success message after the update is completed
            res.status(201).json({ message: 'Category successfully created' });
        } catch (error) {
            // Delete the uploaded file if there was an error during category creation
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ message: 'Error creating category', error });
        }
    });
};

// Get all categories
export const getAllCategoriesHelper = async (req: Request, res: Response) => {
    try {
        const categories: Category[] = await Category.findAll(); // Retrieve all categories from the database
        const data: { // Create an array of category data objects with selected properties
            image: string | undefined;
            name: string;
            id: string;
        }[] = categories.map((category) => ({
            id: category.name,
            name: category.name,
            image: getImageUrl(category.image, "category"), // Get the URL of the category image using getImageUrl function
        }));
        res.json(data); // Send the array of category data objects as the response
    } catch (error) {
        res.status(500).json({ message: 'Error getting categories', error }); // Send an error message if there's an issue with getting categories
    }
};

// Get a specific category by ID
export const getCategoryByIdHelper = async (req: Request, res: Response) => {
    const data = req?.body;
    const categoryId = data.id;

    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const Data = {
            id: category.id,
            name: category.name,
            image: getImageUrl(category.image, "category"),
        };
        // Return category details in the response
        res.status(200).send({ Data });
    } catch (error) {
        res.status(500).json({ message: 'Error getting category', error });
    }
};

// Update an existing category, including the image if provided
export const updateCategoryHelper = async (req: Request, res: Response) => {
    // Use the multer middleware to handle file upload
    upload.single('picture')(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'Error uploading image', timestamp: new Date() });
        }

        const data = req?.body;
        const categoryId = data.id;
        const name  = data.name;
        const image = req.file ? req.file.filename : null;

        try {
            // Find the existing category by ID
            const existingCategory = await Category.findByPk(categoryId);

            if (!existingCategory) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({ message: 'Category not found', timestamp: new Date() });
            }

            // Update category properties
            existingCategory.name = name;
            if (image) {
                existingCategory.image = image;
            }

            if (name == null || name == ""){ //checking if the name is empty or not
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: 'Category name not provided', timestamp: new Date() });
            }
            if (image == null){ //checking if the image is provided or not
                return res.status(400).json({ message: 'Image not provided', timestamp: new Date() });
            }

            // Save the updated category to the database
            await existingCategory.save();

            // Send a success message after the update is completed
            res.status(200).json({ message: 'Category successfully updated' });
        } catch (error) {
            // Delete the uploaded file (if any) if there was an error during category update
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ message: 'Error updating category', error });
        }
    });
};

// Delete a category by ID
export const deleteCategoryHelper = async (req: Request, res: Response) => {
    const data = req?.body;
    const categoryId = data.id;

    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await category.destroy();
        res.status(204).send({status: "Successfully deleted", timestamp: new Date()});//success message
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
