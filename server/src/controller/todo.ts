import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as todoService from "../service/todo";
import { successResponse } from "../utils/response";

// controller function to get all todos for a user.
export function getAllTodos(req: Request, res: Response) {
    const user = req.user!;
    const data = todoService.getAllTodos(user);
    res.json(data);
}

// controller function to get a todo by its ID.
export function getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params; // Getting todo ID from URL parameters
        const user = req.user!;
        const data = todoService.getTodoById(id, user.id);

        res.json(data);
    } catch (error) {
        next(error);
    }
}

// controller function to add a new todo.
export function addTodos(req: Request, res: Response) {
    const { body } = req;
    const user = req.user!;

    const message = todoService.addTodos(body, user);
    res.json(message);
}

// controller function to update a todo by its ID.

export function updateTodoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params; // Getting todo ID from URL parameters
        const { title, description } = req.body; // Extracting title and description from request body
        const user = req.user!;
        const todo = todoService.updateTodoById(id, user.id, title, description);
        successResponse(res, "Todo updated successfully", todo);
    } catch (error) {
        next(error);
    }
}

// controller function to delete a todo by its ID.

export function deleteTodoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params; // Getting todo ID from URL parameters
        const user = req.user!;
        const message = todoService.deleteTodoById(id, user.id);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

// controller function to mark a todo as completed by its ID.
export function completedTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params; // Getting todo ID from URL parameters
        const user = req.user!;
        const message = todoService.isCompleted(id, user.id);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

// controller function to get all completed todos for a user.
export function getAllCompletedTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.user!;
        const data = todoService.getAllCompletedTodos(user.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
}
