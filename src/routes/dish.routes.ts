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

// Routes for handling different dish operations

// Route to add a new dish
router.post("/add", authentication.verifyJWT, createDishController);

// Route to update an existing dish
router.put("/update", authentication.verifyJWT, updateDishController);

// Route to delete a dish
router.delete('/delete/id/:id', authentication.verifyJWT, deleteDishController);

// Route to get a dish by its ID
router.get('/getdish/id/:id', authentication.verifyJWT, getDishController);

// Route to get all dishes
router.get('/getalldishes/limit/:limit/offset/:offset', authentication.verifyJWT, getAllDishController);

export const dishRoutes = router;
