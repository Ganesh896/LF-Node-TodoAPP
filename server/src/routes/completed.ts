import express from "express";
import { completedTodos, getAllCompletedTodos } from "../controller/todo";

const router = express();

//url = http://localhost:3000/api/completed method = GET
router.get("/", getAllCompletedTodos);

//url = http://localhost:3000/api/completed/1 method = GET
router.get("/:id", completedTodos);

export default router;
