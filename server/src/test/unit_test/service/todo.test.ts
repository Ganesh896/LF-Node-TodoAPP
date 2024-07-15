import { expect } from "expect";
import sinon from "sinon";
import { User } from "../../../interface/user";
import { Todo } from "../../../interface/todo";

import * as todoModel from "../../../model/todos";
import { addTodos, deleteTodoById, getAllCompletedTodos, getAllTodos, getTodoById, isCompleted, updateTodoById } from "../../../service/todo";
import { NotFoundError, UnauthenticatedError } from "../../../error/error";

describe("Todo Service", () => {
    let user: User;
    let todos: Todo[];

    beforeEach(() => {
        user = { id: "1", name: "Test User", email: "test@test.com", password: "test123", permissions: ["user"] };
        todos = [
            {
                id: "1",
                user_id: "1",
                title: "Learn Node",
                description: "Learning Node js",
                created_on: "08-07-2024",
                updated_on: "08-07-2024",
                is_completed: false,
            },
        ];
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getAllTodos", () => {
        it("should return all todos for a user", () => {
            sinon.stub(todoModel, "getAllTodos").returns(todos);

            const result = getAllTodos(user);
            expect(result).toStrictEqual(todos);
        });

        it("should return a message if no todos are found", () => {
            sinon.stub(todoModel, "getAllTodos").returns([]);

            const result = getAllTodos(user);
            expect(result).toStrictEqual({ message: "No todos found currently!" });
        });
    });

    describe("getTodoById", () => {
        it("should return a todo by ID", () => {
            sinon.stub(todoModel, "getTodoById").returns(todos[0]);

            const result = getTodoById("1", "1");
            expect(result).toStrictEqual(todos[0]);
        });

        it("should throw a NotFoundError if todo is not found", () => {
            sinon.stub(todoModel, "getTodoById").returns(null);

            expect(() => getTodoById("1", "1")).toThrow(new NotFoundError("Todo with id: 1 is not found!"));
        });
    });

    describe("addTodos", () => {
        it('should add a new todo for a user with "user" permission', () => {
            sinon.stub(todoModel, "addTodos").returns({ message: "Todo Added" });

            const result = addTodos(todos[0], user);
            expect(result).toStrictEqual(todos[0]);
        });

        it('should throw an UnauthenticatedError if user does not have "user" permission', () => {
            user.permissions = ["admin"];
            expect(() => addTodos(todos[0], user)).toThrow(new UnauthenticatedError("Only users can add todos"));
        });
    });

    describe("updateTodoById", () => {
        it("should update a todo by ID", () => {
            const updatedTodo = { ...todos[0], title: "Updated Title", description: "Updated Description" };
            sinon.stub(todoModel, "updateTodoById").returns(updatedTodo);

            const result = updateTodoById("1", "1", "Updated Title", "Updated Description");
            expect(result).toStrictEqual(updatedTodo);
        });

        it("should throw a NotFoundError if todo is not found", () => {
            sinon.stub(todoModel, "updateTodoById").returns(null);

            expect(() => updateTodoById("1", "1", "Updated Title", "Updated Description")).toThrow(new NotFoundError("Todo with id: 1 is not found!"));
        });

        it("should throw an UnauthenticatedError if user is not authorized", () => {
            const updatedTodo = { ...todos[0], user_id: "2" };
            sinon.stub(todoModel, "updateTodoById").returns(updatedTodo);

            expect(() => updateTodoById("1", "1", "Updated Title", "Updated Description")).toThrow(new UnauthenticatedError());
        });
    });

    describe("deleteTodoById", () => {
        it("should delete a todo by ID", () => {
            sinon.stub(todoModel, "deleteTodoById").returns(1);

            const result = deleteTodoById("1", "1");
            expect(result).toStrictEqual({ message: "Todo deleted successfully!" });
        });

        it("should throw a NotFoundError if todo is not found", () => {
            sinon.stub(todoModel, "deleteTodoById").returns(-1);

            expect(() => deleteTodoById("1", "1")).toThrow(new NotFoundError("Todo with id: 1 is not found!"));
        });
    });

    describe("isCompleted", () => {
        it("should mark a todo as completed by ID and user ID", () => {
            sinon.stub(todoModel, "isCompleted").returns(1);

            const result = isCompleted("1", "1");
            expect(result).toStrictEqual({ message: "Todo with id: 1 is completed!" });
        });

        it("should throw a NotFoundError if todo is not found", () => {
            sinon.stub(todoModel, "isCompleted").returns(-1);

            expect(() => isCompleted("1", "1")).toThrow(new NotFoundError("Todo with id: 1 not found!"));
        });
    });

    describe("getAllCompletedTodos", () => {
        it("should return all completed todos for a user by user ID", () => {
            sinon.stub(todoModel, "getAllCompletedTodos").returns(todos);

            const result = getAllCompletedTodos("1");
            expect(result).toStrictEqual(todos);
        });

        it("should return a message if no completed todos are found", () => {
            sinon.stub(todoModel, "getAllCompletedTodos").returns([]);

            const result = getAllCompletedTodos("1");
            expect(result).toStrictEqual({ message: "No todos found currently!" });
        });
    });
});
