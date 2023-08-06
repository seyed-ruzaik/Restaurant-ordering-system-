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
import {createRatingSchema, updateRatingSchema} from "../schema/rating.schema";

// Routes for handling different rating operations

// Route to add a new rating
router.post("/add", authentication.verifyJWT, validateSchemaMiddleware(createRatingSchema), createRatingController);

// Route to update an existing rating
router.put("/update", authentication.verifyJWT, validateSchemaMiddleware(updateRatingSchema), updateRatingController);

// Route to delete a rating
router.delete('/delete/id/:id', authentication.verifyJWT, deleteRatingController);

// Route to get a rating by its ID
router.get('/getrating/id/:id', authentication.verifyJWT, getRatingController);

// Route to get all ratings
router.get('/getallratings/limit/:limit/offset/:offset', authentication.verifyJWT, getAllRatingController);

export const ratingRoutes = router;
