import {
    createRatingController,
    updateRatingController,
    deleteRatingController,
    getAllRatingController,
    getRatingController,
} from "../controllers/rating.controller";
import express from "express";
const router = express.Router();
const authentication = require('../middlewares/authorization');
import {validateSchemaMiddleware} from "../middlewares/ajv-handler";
import {createRatingSchema, updateRatingSchema, deleteRatingSchema, getRatingSchema} from "../schema/rating.schema";

// Routes for handling different rating operations

// Route to add a new rating
router.post("/add", authentication.verifyJWT, validateSchemaMiddleware(createRatingSchema), createRatingController);

// Route to update an existing rating
router.put("/update", authentication.verifyJWT, validateSchemaMiddleware(updateRatingSchema), updateRatingController);

// Route to delete a rating
router.delete('/delete', authentication.verifyJWT, validateSchemaMiddleware(deleteRatingSchema), deleteRatingController);

// Route to get a rating by its ID
router.get('/getrating', authentication.verifyJWT, validateSchemaMiddleware(getRatingSchema), getRatingController);

// Route to get all ratings
router.get('/getallratings', authentication.verifyJWT, getAllRatingController);

export const ratingRoutes = router;
