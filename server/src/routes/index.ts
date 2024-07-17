import express from "express";

import userRouter from "./user";
import todoRouter from "./todo";
import completedRouter from "./completed";

const router = express();

router.use("/users", userRouter);
router.use("/todos", todoRouter);
router.use("/completed", completedRouter);

export default router;
