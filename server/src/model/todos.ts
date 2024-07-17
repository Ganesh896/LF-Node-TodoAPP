import { GetQuery } from "../interface/query";
import { Todo } from "../interface/todo";
import { BaseModel } from "./base";

export class TodoModel extends BaseModel {
    //add todos
    static async addTodo(todo: Todo, userId: string) {
        const todoToAdd = {
            userId,
            title: todo.title,
            description: todo.description,
        };

        await this.queryBuilder().insert(todoToAdd).table("todos");
    }

    //get todos
    static getTodos(filter: GetQuery, userId: string) {
        const { q } = filter;

        const query = this.queryBuilder()
            .select("id", "title", "description")
            .table("todos")
            .limit(filter.size!)
            .offset((filter.page! - 1) * filter.size!);

        if (userId !== "1") {
            query.where({ userId });
        }

        return query;
    }

    //get todos by id
    static async getTodoById(id: string, userId: string) {
        const todo = await this.queryBuilder().select("id", "title", "description").table("todos").where({ userId, id }).first();

        return todo;
    }

    //update todo by Id
    static async updateTodo(id: string, userId: string, todo: Todo) {
        const todoToUpdate = {
            title: todo.title,
            description: todo.description,
        };

        await this.queryBuilder().update(todoToUpdate).table("todos").where({ userId, id });
    }

    //delete todo by id
    static async deleteTodo(id: string, userId: string) {
        const query = await this.queryBuilder().table("todos").where({ userId, id }).delete();
        return query;
    }

    //complete todo
    static completeTodo(id: string, userId: string) {
        return this.queryBuilder().table("todos").where({ userId, id }).update({ isCompleted: true });
    }

    // get all completedTodos
    static getAllCompletedTodos(userId: string) {
        return this.queryBuilder().select("id", "title", "description").table("todos").where({ userId, isCompleted: true });
    }
}
