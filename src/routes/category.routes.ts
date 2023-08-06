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

// Routes for handling different category operations

// Route to add a new category
router.post("/add", authentication.verifyJWT,createCategoryController);

// Route to update an existing category
router.put("/update", authentication.verifyJWT, updateCategoryController);

// Route to delete a category
router.delete('/delete/id/:id', authentication.verifyJWT, deleteCategoryController);

// Route to get a category by its ID
router.get('/getcategory/id/:id', authentication.verifyJWT, getCategoryController);

// Route to get all categories
router.get('/getallcategory/limit/:limit/offset/:offset', authentication.verifyJWT, getAllCategoryController);

export const categoryRoutes = router;
