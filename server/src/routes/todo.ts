import express from "express";
import { addTodos, completedTodos, deleteTodoById, getAllCompletedTodos, getAllTodos, getTodoById, updateTodoById } from "../controller/todo";

const router = express();

//url = http://localhost:3000/api/todos method = GET
router.get("/", getAllTodos);

//url = http://localhost:3000/api/todos/1 method = GET
router.get("/:id", getTodoById);

//url = http://localhost:3000/api/todos method = POST
router.post("/", addTodos);

//url = http://localhost:3000/api/todos/1 method = PUT
router.put("/:id", updateTodoById);

//url = http://localhost:3000/api/todos/1 method = DELETE
router.delete("/:id", deleteTodoById);

export default router;
