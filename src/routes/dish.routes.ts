import {
    createDishController,
    updateDishController,
    deleteDishController,
    getAllDishController,
    getDishController,
} from "../controllers/dish.controller";
import express from "express";
const router = express.Router();
const authentication = require('../middlewares/authorization');
import {validateSchemaMiddleware} from "../middlewares/ajv-handler";
import {deleteDishSchema, getDishSchema} from "../schema/dish.schema";

// Routes for handling different dish operations

// Route to add a new dish
router.post("/add", authentication.verifyJWT, createDishController);

// Route to update an existing dish
router.put("/update", authentication.verifyJWT, updateDishController);

// Route to delete a dish
router.delete('/delete', authentication.verifyJWT, validateSchemaMiddleware(deleteDishSchema), deleteDishController);

// Route to get a dish by its ID
router.get('/getdish', authentication.verifyJWT, validateSchemaMiddleware(getDishSchema), getDishController);

// Route to get all dishes
router.get('/getalldishes', authentication.verifyJWT, getAllDishController);

export const dishRoutes = router;
