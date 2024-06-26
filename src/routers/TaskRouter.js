import express from "express";
import { deleteTask, fetchAllTask, fetchCompletedTasks, fetchPendingTasks, markTaskAsCompleted, saveTask, updateTask } from "../controllers/TaskController.js";

const taskRouter = express.Router();

taskRouter.post('/tasks', saveTask);
taskRouter.get('/tasks/all', fetchAllTask);
taskRouter.get('/tasks/completed', fetchCompletedTasks);
taskRouter.get('/tasks/pending', fetchPendingTasks);
taskRouter.delete('/tasks/:id', deleteTask);
taskRouter.put('/tasks/:id/complete', markTaskAsCompleted);
taskRouter.put('/tasks/:id/update', updateTask);

export default taskRouter;