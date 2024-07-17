import { NotFoundError, UnauthenticatedError } from "../error/error";
import { GetQuery } from "../interface/query";
import { Todo } from "../interface/todo";
import { User } from "../interface/user";
import * as todoModel from "../model/todos";

// get all todos for a user
export async function getTodos(query: GetQuery, userId: string) {
    const data = await todoModel.TodoModel.getTodos(query, userId);
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}

// get a todo by ID
export async function getTodoById(id: string, userId: string) {
    const todo = await todoModel.TodoModel.getTodoById(id, userId);
    if (!todo) {
        throw new NotFoundError(`Todo with id: ${id} is not found!`);
    }
    return todo;
}

// add a new todo, only allowed for users with "user" permission
export function addTodos(todo: Todo, userId: string) {
    todoModel.TodoModel.addTodo(todo, userId);

    return { message: "Todo added successfully!" };
}

// update a todo by ID
export function updateTodo(id: string, userId: string, todo: Todo) {
    todoModel.TodoModel.updateTodo(id, userId, todo);
    return { message: "Todo update successfully!" };
}

// delete a todo by ID
export async function deleteTodo(id: string, userId: string) {
    const deletedRows = await todoModel.TodoModel.deleteTodo(id, userId);
    if (deletedRows < 1) {
        throw new NotFoundError(`Todo with Id: ${id} not found`);
    }
    return { message: "Todo deleted successfully!" };
}

// mark a todo as completed by ID and user ID
export async function completeTodo(id: string, userId: string) {
    const rows = await todoModel.TodoModel.completeTodo(id, userId);
    if (rows < 1) {
        throw new NotFoundError(`Todo with id: ${id} is completed!`);
    }
    return { message: `Todo with id: ${id} not found!` };
}

// get all completed todos for a user by user ID
export async function getAllCompletedTodos(userId: string) {
    const data = await todoModel.TodoModel.getAllCompletedTodos(userId);
    console.log(data);
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}
