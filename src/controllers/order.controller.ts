import { Request, Response } from "express";
import {
    placeOrder,
    viewOrder,
    updateOrderStatus,
    completeOrder
} from "../services/order.service";

// Controller function to create a new order
export const placeOrderController = async (req: Request, res: Response) => {
    try {
        await placeOrder(req, res); // Call the placeOrder service function to create a new order
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to view an existing order
export const viewOrderController = async (req: Request, res: Response) => {
    try {
        await viewOrder(req, res); // Call the viewOrder service function to view an existing order
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to update the status of an existing order
export const updateOrderStatusController = async (req: Request, res: Response) => {
    try {
        await updateOrderStatus(req, res); // Call the updateOrderStatus service function to update the order status
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to mark an existing order as completed
export const completeOrderController = async (req: Request, res: Response) => {
    try {
        await completeOrder(req, res); // Call the completeOrder service function to mark the order as completed
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};
