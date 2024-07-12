import express from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, login, refreshToken, updateUserById } from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { updateUserBodySchema, addUserBodySchema, loginUserBodySchema } from "../schema/user";
import { paramsSchema } from "../schema/common";

const router = express();

router.post("/login", validateReqBody(loginUserBodySchema), login);
router.post("/refresh-token", refreshToken);

// THESE ROUTES CAN ACCESS ONLY BY ADMIN
//create users
router.post("/", validateReqBody(addUserBodySchema), authenticate, authorize("admin"), createUser);
//get all users
router.get("/", authenticate, authorize("admin"), getAllUsers);
//get userById
router.get("/:id", validateReqParams(paramsSchema), authenticate, authorize("admin"), getUserById);
//update userById
router.put("/:id", validateReqParams(paramsSchema), validateReqBody(updateUserBodySchema), authenticate, authorize("admin"), updateUserById);
//delete userById
router.delete("/:id", validateReqParams(paramsSchema), authenticate, authorize("admin"), deleteUserById);

export default router;
