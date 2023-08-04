import { Request, Response } from "express";
import Order from "../models/order";
import OrderItem from "../models/orderItem";
import Dish from "../models/dish";
import User from "../models/user";

// The placeOrderHelper function is responsible for handling the creation of a new order.
export async function placeOrderHelper(req: Request, res: Response) {
    try {
        const { user_id, items } = req.body;

        // Check if the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new order for the user
        const order = await Order.create({
            user_id: user_id,
            status: "pending",
            total_amount: 0, // The total amount will be calculated and updated later
        });

        // Calculate the total amount and create order items
        let totalAmount = 0;
        for (const item of items) {
            const { dish_id, quantity } = item;

            // Check if the dish exists
            const dish = await Dish.findByPk(dish_id);
            if (!dish) {
                order.destroy()
                return res.status(404).json({ message: `Dish with ID ${dish_id} not found` });
            }

            // Validate quantity to be a positive integer
            if (!Number.isInteger(quantity) || quantity <= 0) {
                order.destroy()
                return res.status(400).json({ message: "Quantity must be a positive integer" });
            }

            // Validate quantity to be less than or equal to 5 (you can adjust the limit as needed)
            if (quantity > 5) {
                order.destroy()
                return res.status(400).json({ message: "Quantity cannot exceed 5" });
            }

            // Check if the dish price is defined
            if (dish.price === undefined) {
                order.destroy()
                return res.status(400).json({ message: 'Dish price is not defined', timestamp: new Date() });
            }

            // Calculate the price for the dish based on the quantity
            const price = dish.price * quantity;

            // Validate price to be a positive number
            if (isNaN(price) || price <= 0) {
                order.destroy()
                return res.status(400).json({ message: "Invalid price" });
            }

            // Create an order item for the current dish
            await OrderItem.create({
                order_id: order.id,
                dish_id,
                quantity,
                price,
            });

            totalAmount += price;
        }

        // Update the total amount for the order
        order.total_amount = totalAmount;
        await order.save();

        res.status(201).json({ message: "Order placed successfully", orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// The viewOrderHelper function retrieves a specific order by its ID and includes the associated order items and dishes.
export async function viewOrderHelper(req: Request, res: Response) {
    try {
        const { id } = req.params;

        // Find the order by ID and include the associated order items and dishes
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Dish,
                            attributes: ["id", "name", "price"],
                        },
                    ],
                },
            ],
        });

        if (!order) {
            return res.status(404).json({ message: `Order with ID ${id} not found` });
        }

        res.json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// The updateOrderStatusHelper function updates the status of an existing order based on its ID.
export const updateOrderStatusHelper = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.update({ status }, { where: { id } });

        if (updatedOrder[0] === 0) {
            return res.status(404).json({ message: 'Order not found', timestamp: new Date() });
        }

        res.status(200).json({ message: 'Order status updated successfully', timestamp: new Date() });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};

// The completeOrderHelper function marks an existing order as completed.
export const completeOrderHelper = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedOrder = await Order.update({ status: "completed" }, { where: { id } });

        if (updatedOrder[0] === 0) {
            return res.status(404).json({ message: 'Order not found', timestamp: new Date() });
        }

        res.status(200).json({ message: 'Order marked as complete', timestamp: new Date() });
    } catch (error) {
        res.status(500).json({ message: 'Error marking order as complete', error });
    }
};
