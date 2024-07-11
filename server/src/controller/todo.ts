import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import * as todoService from "../service/todo";
import { successResponse } from "../utils/response";

export function getAllTodos(req: Request, res: Response) {
    const user = req.user!;
    const data = todoService.getAllTodos(user);
    res.json(data);
}

export function getTodoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params; //getting id from url
        const user = req.user!;
        const data = todoService.getTodoById(id, user.id);

        res.json(data);
    } catch (error) {
        next(error);
    }
}

export function addTodos(req: Request, res: Response) {
    const { body } = req;
    const user = req.user!;

    const message = todoService.addTodos(body, user);
    res.json(message);
}

export function updateTodoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { body } = req;
        const todo = todoService.updateTodoById(id, req.user!.id, body.title, body.description);
        successResponse(res, "Todo updated successfully", todo);
    } catch (error) {
        next(error);
    }
}

export function deleteTodoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { body } = req;
        const message = todoService.deleteTodoById(id, body.user_id);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

export function completedTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { body } = req;
        const message = todoService.isCompleted(id, body.user_id);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

export function getAllCompletedTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const { body } = req;
        const data = todoService.getAllCompletedTodos(req.user!.id);
        res.json(data);
    } catch (error) {
        next(error);
    }
}
