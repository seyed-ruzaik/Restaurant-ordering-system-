import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Task from '../models/task';
import {QueryParameters} from '../dto/QueryParametersDto'

export async function getTasksHelper(req: Request, res: Response) {
    try {
        // Get the filter and sort parameters from the request query
        const { status, priority, startDate, endDate, page, perPage } = req.query as QueryParameters;

        // Build the filter object based on the query parameters
        const filter: any = {
            status: status ? status : { [Op.not]: null }, // If status is not provided, filter for non-null status
            priority: priority ? priority : { [Op.not]: null }, // If priority is not provided, filter for non-null priority
        };


        // If startDate and endDate are provided, add a filter for due_date between startDate and endDate
        if (startDate && endDate) {
            filter.due_date = {
                [Op.between]: [startDate, endDate],
            };
        }

        // Calculate the offset based on the page and perPage parameters
        const offset = page ? (Number(page) - 1) * Number(perPage) : 0;
        const limit = perPage ? Number(perPage) : undefined;

        // Query the database using the Task model and apply the filter and sorting
        const tasks = await Task.findAll({
            where: filter,
            order: [['priority', 'ASC']], // Sort tasks by priority in descending order
            offset,
            limit,
        });

        if (tasks.length == 0){
            return res.status(404).json({ error: 'No tasks found' });
        }

        // Send the result as JSON response
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'An error occurred while retrieving tasks' });
    }
}

// POST /tasks
export async function createTaskHelper(req: Request, res: Response) {
    try {
        // Get the task data from the request body
        const { title, status, priority, due_date } = req.body;

        // Check if any of the required fields is missing or empty
        if (!title || !status || !priority || !due_date) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        // Create a new task using the Task model
        const newTask = await Task.create({
            title,
            status,
            priority,
            due_date,
        });

        // Send the newly created task as JSON response
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'An error occurred while creating the task' });
    }
}