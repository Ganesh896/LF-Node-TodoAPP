import express from "express";
import { addTodos, deleteTodo, getTodos, getTodoById, updateTodo } from "../controller/todo";
import { authenticate, authorize } from "../middleware/auth";
import { addTodoBodySchema, updateTodoBodySchema } from "../schema/todo";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { paramsSchema } from "../schema/common";

const router = express();

//url = http://localhost:3000/api/todos method = GET
router.get("/", authenticate, authorize("todos.get"), getTodos);

//url = http://localhost:3000/api/todos/1 method = GET
router.get("/:id", authenticate, validateReqParams(paramsSchema), authorize("todos.get"), getTodoById);

//url = http://localhost:3000/api/todos method = POST
router.post("/", authenticate, validateReqBody(addTodoBodySchema), authorize("todos.create"), addTodos);

//url = http://localhost:3000/api/todos/1 method = PUT
router.put("/:id", authenticate, validateReqParams(paramsSchema), validateReqBody(updateTodoBodySchema), authorize("todos.update"), updateTodo);

//url = http://localhost:3000/api/todos/1 method = DELETE
router.delete("/:id", authenticate, validateReqParams(paramsSchema), authorize("todos.delete"), deleteTodo);

export default router;
