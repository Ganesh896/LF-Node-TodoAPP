import { Todo } from "../interface/todo";
import { BaseModel } from "./base";

export class TodoModel extends BaseModel {
    //add todos
    static async addTodo(todo: Todo, userId: string) {
        const todoToAdd = {
            user_id: userId,
            title: todo.title,
            description: todo.description,
        };

        await this.queryBuilder().insert(todoToAdd).table("todos");
    }

    //get todos
    static async getTodos(user_id: string) {
        // const { q } = filter;

        const query = await this.queryBuilder().select("id", "title", "description").table("todos").where({ user_id });

        return query;
    }

    //get todos by id
    static async getTodoById(id: string, userId: string) {
        const todo = await this.queryBuilder().select("id", "title", "description").table("todos").where({ user_id: userId, id }).first();

        return todo;
    }

    //update todo by Id
    static async updateTodo(id: string, userId: string, todo: Todo) {
        const todoToUpdate = {
            title: todo.title,
            description: todo.description,
        };

        await this.queryBuilder().update(todoToUpdate).table("todos").where({ user_id: userId, id });
    }

    //delete todo by id
    static async deleteTodo(id: string, userId: string) {
        const query = await this.queryBuilder().table("todos").where({ user_id: userId, id }).delete();
        return query;
    }

    //complete todo
    static completeTodo(id: string, userId: string) {
        return this.queryBuilder().table("todos").where({ user_id: userId, id }).update({ is_completed: true });
    }

    // get all completedTodos
    static getAllCompletedTodos(userId: string) {
        return this.queryBuilder().table("todos").where({ user_id: userId, is_completed: true });
    }
}
