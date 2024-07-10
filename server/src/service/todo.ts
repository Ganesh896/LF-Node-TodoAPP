import { Todo } from "../interface/todo";
import * as todoModel from "../model/todos";

export function getAllTodos(userId:number) {
    const data = todoModel.getAllTodos(userId);
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}

export function getTodoById(id: number) {
    const todo = todoModel.getTodoById(id);
    if (!todo) {
        return { message: `Todo with id: ${id} is not found!` };
    }
    return todo;
}

export function addTodos(todo: Todo) {
    console.log(todo);
    if (todo.title && todo.description) {
        return todoModel.addTodos(todo);
    } else {
        return { message: "Both title and description required!" };
    }
}

export function updateTodoById(id: number, title: string, description: string) {
    const todoIndex = todoModel.updateTodoById(id, title, description);
    if (todoIndex != -1) {
        return { message: "Todo updated successfully!" };
    } else {
        return { message: `Todo with id: ${id} not found!` };
    }
}

export function deleteTodoById(id: number) {
    const todoIndex = todoModel.deleteTodoById(id);
    if (todoIndex != -1) {
        return { message: "Todo deleted successfully!" };
    } else {
        return { message: `Todo with id: ${id} not found!` };
    }
}

export function isCompleted(id: number) {
    const todoIndex = todoModel.isCompleted(id);
    if (todoIndex != -1) {
        return { message: `Todo with id: ${id} is completed!` };
    }
    return { message: `Todo with id: ${id} not found!` };
}

export function getAllCompletedTodos() {
    const data = todoModel.getAllCompletedTodos();
    if (data.length > 0) {
        return data;
    }
    return { message: "No todos found currently!" };
}
