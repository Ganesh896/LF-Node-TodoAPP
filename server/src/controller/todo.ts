import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as todoService from "../service/todo";
import { successResponse } from "../utils/response";

export function getAllTodos(req: Request, res: Response) {
    const data = todoService.getAllTodos(req.body.user_id);
    res.json(data);
}

export function getTodoById(req: Request, res: Response) {
    const { id } = req.params; //getting id from url
    const userId = req.body.user_id;
    const data = todoService.getTodoById(Number(id), userId);

    res.json(data);
}

export function addTodos(req: Request, res: Response) {
    const { body } = req;

    const message = todoService.addTodos(body, body.role);
    res.json(message);
}

export function updateTodoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { body } = req;
        const todo = todoService.updateTodoById(Number(id), body.user_id, body.title, body.description);
        successResponse(res, "Todo updated successfully", todo);
    } catch (error) {
        next(error);
    }
}

export function deleteTodoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { body } = req;
        const message = todoService.deleteTodoById(Number(id), body.user_id);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

export function completedTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { body } = req;
        const message = todoService.isCompleted(Number(id), body.user_id);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

export function getAllCompletedTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const { body } = req;
        const data = todoService.getAllCompletedTodos(body.user_id);
        res.json(data);
    } catch (error) {
        next(error);
    }
}
