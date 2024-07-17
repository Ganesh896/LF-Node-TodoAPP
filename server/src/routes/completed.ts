import express from "express";
import { completeTodo, getAllCompletedTodos } from "../controller/todo";

const router = express();

//url = http://localhost:3000/api/completed method = GET
router.get("/", getAllCompletedTodos);

//url = http://localhost:3000/api/completed/1 method = PUT
router.put("/:id", completeTodo);

export default router;
