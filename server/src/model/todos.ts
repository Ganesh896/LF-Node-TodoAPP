import { todos, completed } from "../data/todos";
import { Todo } from "../interface/todo";
import { formatDate } from "../utils/dateFormat";

// returning all todos
export function getAllTodos() {
    return todos;
}

export function getTodoById(id: number) {
    return todos.find(({ id: todoId }) => todoId === id);
}

// addTodo
export function addTodos(todo: Todo) {
    todos.push(todo);
}

// updating title and description
export function updateTodoById(id: number, title: string, description: string) {
    const todoIndex = todos.findIndex(({ id: todoId }) => todoId === Number(id));

    if (todoIndex !== -1) {
        if (title) todos[todoIndex].title = title;
        if (description) todos[todoIndex].description = description;
        todos[todoIndex].updated_on = formatDate(new Date());

        return true;
    } else {
        return false;
    }
}

//deleting todo
export function deleteTodoById(id: number) {
    const todoIndex = todos.findIndex(({ id: todoId }) => todoId === Number(id));
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);

        return true;
    } else {
        return false;
    }
}

//completed todo
export function isCompleted(id: number) {
    const todoIndex = todos.findIndex(({ id: todoId }) => todoId === Number(id));
    const todo = todos[todoIndex];
    todo.is_completed = true;
    completed.push(todo);
    todos.splice(todoIndex, 1);
}

// returning all completedTodos
export function getAllCompletedTodos() {
    return completed;
}
