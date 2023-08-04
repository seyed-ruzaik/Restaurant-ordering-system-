import {
    getTasksController, createTaskController
} from "../controllers/task.controller";
import express from "express";
import {validateSchemaMiddleware} from "../middlewares/ajv-handler";
const router = express.Router();
const authentication = require('../middlewares/authorization');
import {taskSchema} from "../schema/task.schema";


// Routes for handling different task operations

// Route to add a new task
router.post('/add', authentication.verifyJWT, validateSchemaMiddleware(taskSchema), createTaskController);

// Route to get all tasks
router.get("/get-tasks", authentication.verifyJWT, getTasksController);

export const taskRoutes = router;

