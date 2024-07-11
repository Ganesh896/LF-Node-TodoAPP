import express from "express";
import { addTodos, deleteTodoById, getAllTodos, getTodoById, updateTodoById } from "../controller/todo";
import { authenticate } from "../middleware/auth";
import { addTodoBodySchema, todoParamsSchema, updateTodoBodySchema } from "../schema/todo";
import { validateReqBody, validateReqParams } from "../middleware/validator";

const router = express();

//url = http://localhost:3000/api/todos method = GET
router.get("/", authenticate, getAllTodos);

//url = http://localhost:3000/api/todos/1 method = GET
router.get("/:id", authenticate, validateReqParams(todoParamsSchema), getTodoById);

//url = http://localhost:3000/api/todos method = POST
router.post("/", authenticate, validateReqBody(addTodoBodySchema), addTodos);

//url = http://localhost:3000/api/todos/1 method = PUT
router.put("/:id", authenticate, validateReqParams(todoParamsSchema), validateReqBody(updateTodoBodySchema), updateTodoById);

//url = http://localhost:3000/api/todos/1 method = DELETE
router.delete("/:id", authenticate, validateReqParams(todoParamsSchema), deleteTodoById);

export default router;
