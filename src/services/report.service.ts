import { Request, Response } from "express";
import {
    getTotalSalesReportHelper, getTopSellingItemsByOrdersHelper,
    getTopSellingItemsByRevenueHelper, getAverageOrderValueReportHelper
} from "../helpers/report.helper";

// The getTotalSalesReport function is responsible for retrieving the total sales report.
export const getTotalSalesReport = async (req: Request, res: Response) => {
    await getTotalSalesReportHelper(req, res); // Call the getTotalSalesReportHelper function to retrieve the total sales report.
};

// The getTopSellingItemsByOrders function is responsible for retrieving the top selling items by the number of orders.
export const getTopSellingItemsByOrders = async (req: Request, res: Response) => {
    await getTopSellingItemsByOrdersHelper(req, res); // Call the getTopSellingItemsByOrdersHelper function to retrieve top selling items by orders.
};

// The getTopSellingItemsByRevenue function is responsible for retrieving the top selling items by revenue.
export const getTopSellingItemsByRevenue = async (req: Request, res: Response) => {
    await getTopSellingItemsByRevenueHelper(req, res); // Call the getTopSellingItemsByRevenueHelper function to retrieve top selling items by revenue.
};

// The getAverageOrderValueReport function is responsible for retrieving the average order value report.
export const getAverageOrderValueReport = async (req: Request, res: Response) => {
    await getAverageOrderValueReportHelper(req, res); // Call the getAverageOrderValueReportHelper function to retrieve the average order value report.
};
