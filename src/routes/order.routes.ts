import {
    placeOrderController,
    viewOrderController,
    updateOrderStatusController,
    completeOrderController
} from "../controllers/order.controller";
import express from "express";
const router = express.Router();
const authentication = require('../middlewares/authorization');
import {validateSchemaMiddleware} from "../middlewares/ajv-handler";
import {placeOrderSchema, orderStatusSchema} from "../schema/order.schema";

// Routes for handling different order operations

// Place a new order
router.post("/place-order", authentication.verifyJWT, validateSchemaMiddleware(placeOrderSchema), placeOrderController);

// Update the status of an order
router.patch("/id/:id/status", authentication.verifyJWT, validateSchemaMiddleware(orderStatusSchema),
    updateOrderStatusController);

// Get a specific order by ID
router.get("/id/:id", authentication.verifyJWT, viewOrderController);

// Mark an order as complete
router.patch("/id/:id/complete", authentication.verifyJWT,
   completeOrderController);

export const orderRoutes = router;
