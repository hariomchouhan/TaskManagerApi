import { StatusCodes } from "http-status-codes";
import { Task } from "../models/Task.js";

export async function saveTask(request, response) {
    try {
        const date = new Date();
        request.body['deadline']= new Date(request.body.deadline);
        const task = new Task({...request.body, createdOn: date});
        const savedTask = await task.save();
        response.status(StatusCodes.CREATED).json(savedTask);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error in saving task'});
    }
}

export async function fetchAllTask(request, response) {
    try {
        // pagination
        const tasks = await Task.find();
        response.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error in fetching task'});
    }
}

export async function fetchCompletedTasks(request, response) {
    try {
        // pagination
        const tasks = await Task.find({isCompleted: true});
        response.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error in fetching task'});
    }
}

export async function fetchPendingTasks(request, response) {
    try {
        const tasks = await Task.find({isCompleted: false});
        response.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error in fetching task'});
    }
}

export async function deleteTask(request, response) {
    try {
        await Task.findByIdAndDelete(request.params.id);
        response.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error in deleting task'});
    }
}

export async function markTaskAsCompleted(request, response) {
    try {
        await Task.findByIdAndUpdate(request.params.id, {isCompleted: true, completedOn: new Date()});
        response.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error in updating task'});
    }
}
