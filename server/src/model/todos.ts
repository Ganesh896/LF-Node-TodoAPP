import { todos, completed } from "../data/todos";
import { UnauthenticatedError } from "../error/error";
import { Todo } from "../interface/todo";
import { formatDate } from "../utils/dateFormat";

// for maintaing todo id
let todoCounts = todos.length + 1;

// returning all todos
export function getAllTodos(userId: number) {
    return todos.filter(({ user_id }) => userId === user_id);
}

export function getTodoById(id: number) {
    return todos.find(({ id: todoId }) => todoId === id);
}

// addTodo
export function addTodos(todo: Todo, role: string) {
    if (role === "user") {
        const newTodo = {
            user_id: todo.user_id,
            title: todo.title,
            description: todo.description,
            created_on: formatDate(new Date()),
            updated_on: formatDate(new Date()),
            is_completed: false,
            id: todoCounts,
        };
        todos.push(newTodo);
        todoCounts++;
        return { message: "Todo added successfully!" };
    } else {
        throw new UnauthenticatedError("Only Users can add todos");
    }
}

// updating title and description
export function updateTodoById(id: number, title: string, description: string) {
    const todo = todos.find(({ id: todoId }) => todoId === Number(id));

    if (todo) {
        if (title) todo.title = title;
        if (description) todo.description = description;
        todo.updated_on = formatDate(new Date());
    }

    return todo;
}

//deleting todo
export function deleteTodoById(id: number, userId: number) {
    const todoIndex = todos.findIndex(({ id: todoId, user_id }) => todoId === Number(id) && userId === user_id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
    }

    return todoIndex;
}

//completed todo
export function isCompleted(id: number, userId: number) {
    const todoIndex = todos.findIndex(({ id: todoId, user_id }) => todoId === Number(id) && userId === user_id);

    if (todoIndex != -1) {
        const todo = todos[todoIndex];
        todo.is_completed = true;
        completed.push(todo);
        todos.splice(todoIndex, 1);
    }

    return todoIndex;
}

// returning all completedTodos
export function getAllCompletedTodos(userId: number) {
    return completed.filter(({ user_id: id }) => userId === id);
}
