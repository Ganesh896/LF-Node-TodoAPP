import express from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, login, refreshToken, updateUserById } from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { addUserBodySchema, todoParamsSchema } from "../schema/user";

const router = express();

router.post("/login", login);
router.post("/refresh-token", refreshToken);

// THESE ROUTES CAN ACCESS ONLY BY ADMIN
//create users
router.post("/", authenticate, authorize("admin"), validateReqBody(addUserBodySchema), createUser);
//get all users
router.get("/", authenticate, authorize("admin"), getAllUsers);
//get userById
router.get("/:id", authenticate, authorize("admin"), validateReqParams(todoParamsSchema), getUserById);
//update userById
router.put("/:id", authenticate, authorize("admin"),validateReqParams(todoParamsSchema), updateUserById);
//delete userById
router.delete("/:id", authenticate, authorize("admin"), validateReqParams(todoParamsSchema), deleteUserById);

export default router;
