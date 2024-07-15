import express from "express";
import { addTodos, deleteTodoById, getAllTodos, getTodoById, updateTodoById } from "../controller/todo";
import { authenticate, authorize } from "../middleware/auth";
import { addTodoBodySchema, updateTodoBodySchema } from "../schema/todo";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { paramsSchema } from "../schema/common";
import { Permissions } from "../constants/permissions";

const router = express();

//url = http://localhost:3000/api/todos method = GET
router.get("/", authenticate, authorize(Permissions.TODO_GET), getAllTodos);

//url = http://localhost:3000/api/todos/1 method = GET
router.get("/:id", authenticate, validateReqParams(paramsSchema), authorize(Permissions.TODO_GET), getTodoById);

//url = http://localhost:3000/api/todos method = POST
router.post("/", authenticate, validateReqBody(addTodoBodySchema), authorize(Permissions.TODO_CREATE), addTodos);

//url = http://localhost:3000/api/todos/1 method = PUT
router.put("/:id", authenticate, validateReqParams(paramsSchema), validateReqBody(updateTodoBodySchema), authorize(Permissions.TODO_UPDATE), updateTodoById);

//url = http://localhost:3000/api/todos/1 method = DELETE
router.delete("/:id", authenticate, validateReqParams(paramsSchema), authorize(Permissions.TODO_DELETE), deleteTodoById);

export default router;
