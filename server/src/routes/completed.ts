import express from "express";
import { completedTodos, getAllCompletedTodos } from "../controller/todo";

const router = express();

//url = http://localhost:3000/api/completedTodos method = GET
router.get("/", getAllCompletedTodos);

//url = http://localhost:3000/api/completedTodos/1 method = PUT
router.put("/:id", completedTodos);

export default router;
