import express from "express";

import todoRouter from "./todo";
import completedRouter from "./completed";

const router = express();

router.use("/api/todos", todoRouter);
router.use("/api/completedTodos", completedRouter);

export default router;
