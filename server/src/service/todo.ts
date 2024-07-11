import { NotFoundError, UnauthenticatedError } from "../error/error";
import { Todo } from "../interface/todo";
import * as todoModel from "../model/todos";

export function getAllTodos(userId: number) {
    const data = todoModel.getAllTodos(userId);
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}

export function getTodoById(id: number, userId: number) {
    const todo = todoModel.getTodoById(id);

    if (!todo) {
        throw new NotFoundError(`Todo with id: ${id} is not found!`);
    }

    if (userId !== todo?.user_id) {
        throw new UnauthenticatedError();
    }

    return todo;
}

export function addTodos(todo: Todo, role:string) {
    console.log(todo);
    if (todo.title && todo.description) {
        return todoModel.addTodos(todo, role);
    } else {
        return { message: "Both title and description required!" };
    }
}

export function updateTodoById(id: number, userId: number, title: string, description: string) {
    const todo = todoModel.updateTodoById(id, title, description);
    if (!todo) {
        throw new NotFoundError(`Todo with id: ${id} is not found!`);
    }

    if (userId !== todo?.user_id) {
        throw new UnauthenticatedError();
    }

    return todo;
}

export function deleteTodoById(id: number, userId: number) {
    const todoIndex = todoModel.deleteTodoById(id, userId);
    if (todoIndex != -1) {
        return { message: "Todo deleted successfully!" };
    } else {
        throw new NotFoundError(`Todo with id: ${id} is not found!`);
    }
}

export function isCompleted(id: number, userId: number) {
    const todoIndex = todoModel.isCompleted(id, userId);
    if (todoIndex === -1) {
        throw new NotFoundError(`Todo with id: ${id} is completed!`);
    }
    return { message: `Todo with id: ${id} not found!` };
}

export function getAllCompletedTodos(userId:number) {
    const data = todoModel.getAllCompletedTodos(userId);
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}
