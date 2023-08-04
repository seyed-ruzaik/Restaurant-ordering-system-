import { Request, Response } from "express";
import {
    placeOrderHelper,
    viewOrderHelper,
    updateOrderStatusHelper,
    completeOrderHelper,
} from "../helpers/order.helper";

// The placeOrder function is responsible for handling the creation of a new order.
export const placeOrder = async (req: Request, res: Response) => {
    await placeOrderHelper(req, res); // Call the placeOrderHelper function to perform the order creation logic.
};

// The viewOrder function handles the retrieval of an existing order.
export const viewOrder = async (req: Request, res: Response) => {
    await viewOrderHelper(req, res); // Call the viewOrderHelper function to perform the order retrieval logic.
};

// The updateOrderStatus function updates the status of an existing order based on its ID.
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        await updateOrderStatusHelper(req, res); // Call the updateOrderStatusHelper function to update the order status by ID.
    } catch (error) {
        res.status(400).send({ message: error.message }); // If an error occurs, send an error message back to the client with a status code of 400.
    }
};

// The completeOrder function marks an existing order as completed.
export const completeOrder = async (req: Request, res: Response) => {
    try {
        await completeOrderHelper(req, res); // Call the completeOrderHelper function to mark the order as completed.
    } catch (error) {
        res.status(400).send({ message: error.message }); // If an error occurs, send an error message back to the client with a status code of 400.
    }
};
