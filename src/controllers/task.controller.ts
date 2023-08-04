import { Request, Response } from "express";
import {
    getTasks, createTask
} from "../services/task.service";

// Controller function to get all tasks
export const getTasksController = async (req: Request, res: Response) => {
    try {
        await getTasks(req, res); // Call the getTasks service function to retrieve all tasks.
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};

// Controller function to create a new task
export const createTaskController = async (req: Request, res: Response) => {
    try {
        await createTask(req, res); // Call the createTask service function to create a new task.
    } catch (error) {
        res.status(400).send({ error: error.message, timestamp: new Date() }); // Send error message if an error occurs
    }
};
