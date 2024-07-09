import express from "express";
import { addTodos, deleteTodoById, getAllTodos, getTodoById, updateTodoById } from "../controller/todo";
import { auth } from "../middleware/auth";

const router = express();

//url = http://localhost:3000/api/todos method = GET
router.get("/", auth, getAllTodos);

//url = http://localhost:3000/api/todos/1 method = GET
router.get("/:id", auth, getTodoById);

//url = http://localhost:3000/api/todos method = POST
router.post("/", auth, addTodos);

//url = http://localhost:3000/api/todos/1 method = PUT
router.put("/:id", auth, updateTodoById);

//url = http://localhost:3000/api/todos/1 method = DELETE
router.delete("/:id", auth, deleteTodoById);

export default router;
