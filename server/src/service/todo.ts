import { Todo } from "../interface/todo";
import * as todoModel from "../model/todos";

export function getAllTodos() {
    return todoModel.getAllTodos();
}

export function getTodoById(id: number) {
    return todoModel.getTodoById(id);
}

export function addTodos(todo: Todo) {
    todoModel.addTodos(todo);
}

export function updateTodoById(id: number, title: string, description: string) {
    return todoModel.updateTodoById(id, title, description);
}

export function deleteTodoById(id: number) {
    return todoModel.deleteTodoById(id);
}

export function isCompleted(id: number) {
    todoModel.isCompleted(id);
}

export function getAllCompletedTodos() {
    return todoModel.getAllCompletedTodos();
}