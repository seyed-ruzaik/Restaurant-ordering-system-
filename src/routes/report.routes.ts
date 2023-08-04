import {
    getTotalSalesReportController,
    getTopSellingItemsByOrdersController,
    getTopSellingItemsByRevenueController,
    getAverageOrderValueReportController
} from "../controllers/report.controller";
import express from "express";
const router = express.Router();
const authentication = require('../middlewares/authorization');

// Routes for handling different report operations

// Route to get the total sales report between specified start and end dates
router.get("/sales/start/:start/end/:end", authentication.verifyJWT, getTotalSalesReportController);

// Route to get the top selling items by the number of orders
router.get('/top-selling-items/orders', authentication.verifyJWT, getTopSellingItemsByOrdersController);

// Route to get the top selling items by revenue
router.get('/top-selling-items/revenue', authentication.verifyJWT, getTopSellingItemsByRevenueController);

// Route to get the average order value report between specified start and end dates
router.get('/average-order-value/start/:start/end/:end', authentication.verifyJWT, getAverageOrderValueReportController);

export const reportRoutes = router;
