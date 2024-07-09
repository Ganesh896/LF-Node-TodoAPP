import { Request, Response } from "express";
import * as todoService from "../service/todo";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config";

export function getAllTodos(req: Request, res: Response) {
    const data = todoService.getAllTodos();
    res.json(data);
}

export function getTodoById(req: Request, res: Response) {
    const { id } = req.params; //getting id from url
    const data = todoService.getTodoById(Number(id));

    res.json(data);
}

export function addTodos(req: Request, res: Response) {
    const { body } = req;

    const { authorization } = req.headers;

    const token = authorization?.split(" ")!;

    let currentUser: JwtPayload;
    try {
        currentUser = verify(token[1], config.jwt.secret!) as JwtPayload;
    } catch (error) {
        return { error: "Invalid refresh token" };
    }


    body.user_id = currentUser?.id;

    const message = todoService.addTodos(body);
    res.json(message);
}

export function updateTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description } = req.body;
    const message = todoService.updateTodoById(Number(id), title, description);
    res.json(message);
}

export function deleteTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const message = todoService.deleteTodoById(Number(id));
    res.json(message);
}

export function completedTodos(req: Request, res: Response) {
    const { id } = req.params;
    const message = todoService.isCompleted(Number(id));
    res.json(message);
}

export function getAllCompletedTodos(req: Request, res: Response) {
    const data = todoService.getAllCompletedTodos();
    res.json(data);
}
