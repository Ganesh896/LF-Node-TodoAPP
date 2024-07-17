import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as todoService from "../service/todo";
import { successResponse } from "../utils/response";
import { GetQuery } from "../interface/query";

// controller function to add a new todo.
export function addTodos(req: Request, res: Response) {
    const { body } = req;
    const user = req.user!;

    const message = todoService.addTodos(body, user.id);
    res.json(message);
}

// controller function to get all todos for a user.
export async function getTodos(req: Request, res: Response) {
    // const { query } = req;
    const user = req.user!;
    const data = await todoService.getTodos(user.id);
    res.json(data);
}

// controller function to get a todo by its ID.
export async function getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const data = await todoService.getTodoById(id);

        res.json(data);
    } catch (error) {
        next(error);
    }
}

// controller function to update a todo by its ID.

export async function updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params; // Getting todo ID from URL parameters
        const { body } = req; // Extracting title and description from request body
        const message = await todoService.updateTodo(id, body);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

// controller function to delete a todo by its ID.

export function deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params; // Getting todo ID from URL parameters
        const message = todoService.deleteTodo(id);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

// controller function to mark a todo as completed by its ID.
export function completeTodo(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params; // Getting todo ID from URL parameters
        const message = todoService.completeTodo(id);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

// controller function to get all completed todos for a user.
export function getAllCompletedTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const data = todoService.getAllCompletedTodos();
        res.json(data);
    } catch (error) {
        next(error);
    }
}
