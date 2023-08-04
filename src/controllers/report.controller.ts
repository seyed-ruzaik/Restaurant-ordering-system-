import { Request, Response } from "express";
import {
    getTotalSalesReport, getTopSellingItemsByOrders, getTopSellingItemsByRevenue, getAverageOrderValueReport
} from "../services/report.service";

// Controller function to get the total sales report
export const getTotalSalesReportController = async (req: Request, res: Response) => {
    try {
        await getTotalSalesReport(req, res); // Call the getTotalSalesReport service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to get the top selling items by the number of orders
export const getTopSellingItemsByOrdersController = async (req: Request, res: Response) => {
    try {
        await getTopSellingItemsByOrders(req, res); // Call the getTopSellingItemsByOrders service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to get the top selling items by revenue
export const getTopSellingItemsByRevenueController = async (req: Request, res: Response) => {
    try {
        await getTopSellingItemsByRevenue(req, res); // Call the getTopSellingItemsByRevenue service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to get the average order value report
export const getAverageOrderValueReportController = async (req: Request, res: Response) => {
    try {
        await getAverageOrderValueReport(req, res); // Call the getAverageOrderValueReport service function
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};
