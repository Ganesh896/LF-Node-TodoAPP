import express from "express";
import { completeTodo, getAllCompletedTodos } from "../controller/todo";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqParams, validateReqBody } from "../middleware/validator";
import { paramsSchema } from "../schema/common";
import { updateTodoBodySchema } from "../schema/todo";

const router = express();

//url = http://localhost:3000/api/completed method = GET
router.get("/", authenticate, authorize("todos.get"), getAllCompletedTodos);

//url = http://localhost:3000/api/completed/1 method = PUT
router.put("/:id", authenticate, validateReqParams(paramsSchema), validateReqBody(updateTodoBodySchema), authorize("todos.update"), completeTodo);

export default router;
