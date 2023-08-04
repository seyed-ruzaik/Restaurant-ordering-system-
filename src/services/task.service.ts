import { Request, Response } from "express";
import {
    getTasksHelper, createTaskHelper
} from "../helpers/task.helper";

// The getTasks function is responsible for retrieving all tasks.
export const getTasks = async (req: Request, res: Response) => {
    await getTasksHelper(req, res); // Call the getTasksHelper function to retrieve all tasks.
};

// The createTask function is responsible for creating a new task.
export const createTask = async (req: Request, res: Response) => {
    await createTaskHelper(req, res); // Call the createTaskHelper function to create a new task.
};
