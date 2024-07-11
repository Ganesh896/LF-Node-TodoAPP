import { NotFoundError, UnauthenticatedError } from "../error/error";
import { Todo } from "../interface/todo";
import { User } from "../interface/user";
import * as todoModel from "../model/todos";

// get all todos for a user
export function getAllTodos(user: User) {
    const data = todoModel.getAllTodos(user);
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}

// get a todo by ID
export function getTodoById(id: string, userId: string) {
    const todo = todoModel.getTodoById(id, userId);
    if (!todo) {
        throw new NotFoundError(`Todo with id: ${id} is not found!`);
    }
    return todo;
}

// add a new todo, only allowed for users with "user" permission
export function addTodos(todo: Todo, user: User) {
    if (user.permissions[0] === "user") {
        return todoModel.addTodos(todo, user);
    } else {
        throw new UnauthenticatedError("Only users can add todos");
    }
}

// update a todo by ID
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

// delete a todo by ID
export function deleteTodoById(id: string, userId: string) {
    const todoIndex = todoModel.deleteTodoById(id, userId);
    if (todoIndex != -1) {
        return { message: "Todo deleted successfully!" };
    } else {
        throw new NotFoundError(`Todo with id: ${id} is not found!`);
    }
}

// mark a todo as completed by ID and user ID
export function isCompleted(id: string, userId: string) {
    const todoIndex = todoModel.isCompleted(id, userId);
    if (todoIndex === -1) {
        throw new NotFoundError(`Todo with id: ${id} is completed!`);
    }
    return { message: `Todo with id: ${id} not found!` };
}

// get all completed todos for a user by user ID
export function getAllCompletedTodos(userId: string) {
    const data = todoModel.getAllCompletedTodos(userId);
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}
