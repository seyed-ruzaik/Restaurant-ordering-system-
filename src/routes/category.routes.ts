import {
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
    getAllCategoryController,
    getCategoryController,
} from "../controllers/category.controller";
import express from "express";
const router = express.Router();
const authentication = require('../middlewares/authorization');
import {validateSchemaMiddleware} from "../middlewares/ajv-handler";
import {deleteCategorySchema, getCategorySchema} from "../schema/category.schema";

// Routes for handling different category operations

// Route to add a new category
router.post("/add", authentication.verifyJWT,createCategoryController);

// Route to update an existing category
router.put("/update", authentication.verifyJWT, updateCategoryController);

// Route to delete a category
router.delete('/delete', authentication.verifyJWT, validateSchemaMiddleware(deleteCategorySchema),deleteCategoryController);

// Route to get a category by its ID
router.get('/getcategory', authentication.verifyJWT, validateSchemaMiddleware(getCategorySchema), getCategoryController);

// Route to get all categories
router.get('/getallcategory', authentication.verifyJWT, getAllCategoryController);

export const categoryRoutes = router;
