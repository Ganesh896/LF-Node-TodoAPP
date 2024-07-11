import { NotFoundError, UnauthenticatedError } from "../error/error";
import { Todo } from "../interface/todo";
import { User } from "../interface/user";
import * as todoModel from "../model/todos";

export function getAllTodos(user: User) {
    const data = todoModel.getAllTodos(user);
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}

export function getTodoById(id: string, userId: string) {
    const todo = todoModel.getTodoById(id);

    if (!todo) {
        throw new NotFoundError(`Todo with id: ${id} is not found!`);
    }

    if (userId !== todo?.user_id) {
        throw new UnauthenticatedError();
    }

    return todo;
}

export function addTodos(todo: Todo, user: User) {
    console.log(todo);
    if (todo.title && todo.description) {
        return todoModel.addTodos(todo, user);
    } else {
        return { message: "Both title and description required!" };
    }
}

export function updateTodoById(id: string, userId: string, title: string, description: string) {
    const todo = todoModel.updateTodoById(id, title, description);
    if (!todo) {
        throw new NotFoundError(`Todo with id: ${id} is not found!`);
    }

    if (userId !== todo?.user_id) {
        throw new UnauthenticatedError();
    }

    return todo;
}

export function deleteTodoById(id: string, userId: string) {
    const todoIndex = todoModel.deleteTodoById(id, userId);
    if (todoIndex != -1) {
        return { message: "Todo deleted successfully!" };
    } else {
        throw new NotFoundError(`Todo with id: ${id} is not found!`);
    }
}

export function isCompleted(id: string, userId: string) {
    const todoIndex = todoModel.isCompleted(id, userId);
    if (todoIndex === -1) {
        throw new NotFoundError(`Todo with id: ${id} is completed!`);
    }
    return { message: `Todo with id: ${id} not found!` };
}

export function getAllCompletedTodos(userId: string) {
    const data = todoModel.getAllCompletedTodos(userId);
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}
