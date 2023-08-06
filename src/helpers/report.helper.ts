import { Request, Response } from 'express';
import sequelize from 'sequelize';
import Order from '../models/order';
import Dish from "../models/dish";
import OrderItem from "../models/orderItem";

export async function getTotalSalesReportHelper(req: Request, res: Response) {
    try {
        // Get the required parameters from the request query or body
        const { start, end } = req.params;

        // Calculate the start and end date for the query
        const endDate = new Date(end);
        const startDate = new Date(start);

        endDate.setDate(endDate.getDate() + 1);

        // Execute the Sequelize query to calculate the total sales for the report
        const result = await Order.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
                [sequelize.fn('SUM', sequelize.col('total_amount')), 'total_sales'],
            ],
            where: {
                created_at: {
                    [sequelize.Op.gte]: startDate,
                    [sequelize.Op.lt]: endDate,
                },
                status: 'completed',
            },
            group: [sequelize.fn('DATE', sequelize.col('created_at'))],
            order: [sequelize.fn('DATE', sequelize.col('created_at'))],
        });


        if (result.length == 0){
            return res.status(404).json({ error: 'Sales not found' });
        }
        // Calculate the total sum of total_sales

        const totalSalesSum = result.reduce((sum, order) => sum +
            parseInt(<string>order.get('total_sales')), 0);
        res.status(200).send({
            message: `The total sales between ${start} and ${end} = ${totalSalesSum}`,
            report: result
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while generating the report' });
    }
}

export async function getTopSellingItemsByOrdersHelper(req: Request, res: Response) {
    try {
        const result = await OrderItem.findAll({
            attributes: [
                'dish_id', [sequelize.fn('COUNT', sequelize.col('dish_id')), 'total_orders'],],
            group: ['dish_id'],
            order: [[sequelize.literal('total_orders'), 'DESC']],
            include: [
                {
                    model: Dish,
                    attributes: ['name'],
                },
                {
                    model: Order,
                    as: 'order', // This assumes you have set the alias 'order' for the Order model association in the OrderItem model
                    attributes: [], // This will exclude all Order attributes from the result and only use the where condition
                    where: {
                        status: 'completed',
                    },
                },
            ],
        });
        if (result.length == 0){
            return res.status(404).json({ error: 'No items available' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while generating the report' });
    }
}


export async function getTopSellingItemsByRevenueHelper(req: Request, res: Response) {
    try {
        const orderItems = await OrderItem.findAll({
            attributes: ['dish_id', [sequelize.literal('SUM(quantity * price)'), 'revenue']],
            group: ['dish_id'],
            order: [[sequelize.literal('revenue'), 'DESC']],
            include: [
                {
                    model: Order,
                    as: 'order', // This assumes you have set the alias 'order' for the Order model association in the OrderItem model
                    attributes: [], // This will exclude all Order attributes from the result and only use the where condition
                    where: {
                        status: 'completed',
                    },
                },
            ],
        });


        if (orderItems.length == 0){
            return res.status(404).json({ error: 'No items available' });
        }
        const result = [];

        for (const orderItem of orderItems) {

            const { dish_id} = orderItem;
            const  revenue  = orderItem.get("revenue")
            const dish = await Dish.findByPk(dish_id); // Replace 'findByPk' with 'findOne' if necessary

            if (dish) {
                result.push({
                    dish_id,
                    name: dish.name,
                    revenue,
                });
            }
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while generating the report' });
    }
}

export async function getAverageOrderValueReportHelper(req: Request, res: Response) {
    try {
        // Get the required parameters from the request query or body
        const { start, end } = req.params;

        // Calculate the start and end date for the query
        const endDate = new Date(end);
        const startDate = new Date(start);

        endDate.setDate(endDate.getDate() + 1);

        // Execute the Sequelize query to calculate the average order value for the report
        const result = await Order.findOne({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('total_amount')), 'average_order_value'],
            ],
            where: {
                created_at: {
                    [sequelize.Op.gte]: startDate,
                    [sequelize.Op.lt]: endDate,
                },
                status: 'completed',
            },
        });

        if (result == null){
            return res.status(404).json({ error: 'No Orders available' });
        }
        // Send the report data in the response
        res.status(200).json(result);
    } catch (error) {
        console.error('Error generating the report:', error);
        res.status(500).json({ error: 'An error occurred while generating the report' });
    }
}
