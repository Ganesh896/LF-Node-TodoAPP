import { Request, Response } from "express";
import * as todoService from "../service/todo";
import { formatDate } from "../utils/dateFormat";
import { todos } from "../data/todos";

// for maintaing todo id
let todoCounts = todos.length + 1;

export function getAllTodos(req: Request, res: Response) {
    const data = todoService.getAllTodos();
    res.json(data);
}

export function getTodoById(req: Request, res: Response) {
    const { id } = req.params; //getting id from url
    const todo = todoService.getTodoById(Number(id));
    if (todo) {
        res.json(todo);
    } else {
        res.json({ message: `Todo with Id: ${id} is not found!` });
    }
}

export function addTodos(req: Request, res: Response) {
    const { body } = req;
    // creating new todo to add
    const newTodo = {
        id: todoCounts,
        ...body,
        created_on: formatDate(new Date()),
        updated_on: formatDate(new Date()),
        is_completed: false,
    };
    todoService.addTodos(newTodo);
    todoCounts++;
    res.json({ message: "Todo Added Successfully" });
}

export function updateTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description } = req.body;
    const resp = todoService.updateTodoById(Number(id), title, description);
    if (resp) {
        res.json({ message: "Todo Updated Successfully" });
    } else {
        res.json({ message: `Todo with id: ${id} is not found!` });
    }
}

export function deleteTodoById(req: Request, res: Response) {
    const { id } = req.params;
    const resp = todoService.deleteTodoById(Number(id));
    if (resp) {
        res.json({ message: "Deleted Successfully" });
    } else {
        res.json({ message: `Todo with id: ${id} is not found!` });
    }
}

export function completedTodos(req: Request, res: Response) {
    const { id } = req.params;
    todoService.isCompleted(Number(id));
    res.json({ message: `Todo with id: ${id} is completed` });
}

export function getAllCompletedTodos(req: Request, res: Response) {
    const data = todoService.getAllCompletedTodos();
    res.json(data);
}
