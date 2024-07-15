import { todos } from "../data/todos";
import { UnauthenticatedError } from "../error/error";
import { Todo } from "../interface/todo";
import { User } from "../interface/user";
import { formatDate } from "../utils/dateFormat";

// for maintaing todo id
let todoCounts = 0;

// returning all todos
export function getAllTodos(user: User) {
    return todos.filter(({ user_id }) => user.id === user_id);
}

export function getTodoById(id: string, userId: string) {
    return todos.find(({ id: todoId, user_id }) => todoId === id && userId === user_id);
}

// addTodo
export function addTodos(todo: Todo, user: User) {
    todoCounts++;
    if (user.permissions[0] === "user") {
        const newTodo = {
            // title: todo.title,
            // description: todo.description,
            ...todo,
            created_on: formatDate(new Date()),
            updated_on: formatDate(new Date()),
            is_completed: false,
            id: todoCounts + "",
            user_id: user.id,
        };
        todos.push(newTodo);

        return { message: "Todo added successfully!" };
    } else {
        throw new UnauthenticatedError("Only Users can add todos");
    }
}

// updating title and description
export function updateTodoById(id: string, title: string, description: string) {
    const todo = todos.find(({ id: todoId }) => todoId === id);

    if (todo) {
        if (title) todo.title = title;
        if (description) todo.description = description;
        todo.updated_on = formatDate(new Date());
    }

    return todo;
}

//deleting todo
export function deleteTodoById(id: string, userId: string) {
    const todoIndex = todos.findIndex(({ id: todoId, user_id }) => todoId === id && userId === user_id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
    }
    return todoIndex;
}

//completed todo
export function isCompleted(id: string, userId: string) {
    const todoIndex = todos.findIndex(({ id: todoId, user_id }) => todoId === id && userId === user_id);

    if (todoIndex != -1) {
        const todo = todos[todoIndex];
        todo.is_completed = true;
        todos.splice(todoIndex, 1);
    }

    return todoIndex;
}

// returning all completedTodos
export function getAllCompletedTodos(userId: string) {
    return todos.filter(({ user_id: id, is_completed }) => userId === id && is_completed === true);
}
