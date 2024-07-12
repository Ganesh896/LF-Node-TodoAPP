import express from "express";
import { addTodos, deleteTodoById, getAllTodos, getTodoById, updateTodoById } from "../controller/todo";
import { authenticate } from "../middleware/auth";
import { addTodoBodySchema, updateTodoBodySchema } from "../schema/todo";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { paramsSchema } from "../schema/common";

const router = express();

//url = http://localhost:3000/api/todos method = GET
router.get("/", authenticate, getAllTodos);

//url = http://localhost:3000/api/todos/1 method = GET
router.get("/:id", authenticate, validateReqParams(paramsSchema), getTodoById);

//url = http://localhost:3000/api/todos method = POST
router.post("/", authenticate, validateReqBody(addTodoBodySchema), addTodos);

//url = http://localhost:3000/api/todos/1 method = PUT
router.put("/:id", authenticate, validateReqParams(paramsSchema), validateReqBody(updateTodoBodySchema), updateTodoById);

//url = http://localhost:3000/api/todos/1 method = DELETE
router.delete("/:id", authenticate, validateReqParams(paramsSchema), deleteTodoById);

export default router;
