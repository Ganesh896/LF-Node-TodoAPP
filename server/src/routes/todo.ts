import express from "express";
import { addTodos, deleteTodoById, getAllTodos, getTodoById, updateTodoById } from "../controller/todo";
import { authenticate } from "../middleware/auth";

const router = express();

//url = http://localhost:3000/api/todos method = GET
router.get("/", authenticate, getAllTodos);

//url = http://localhost:3000/api/todos/1 method = GET
router.get("/:id", authenticate, getTodoById);

//url = http://localhost:3000/api/todos method = POST
router.post("/", authenticate, addTodos);

//url = http://localhost:3000/api/todos/1 method = PUT
router.put("/:id", authenticate, updateTodoById);

//url = http://localhost:3000/api/todos/1 method = DELETE
router.delete("/:id", authenticate, deleteTodoById);

export default router;
