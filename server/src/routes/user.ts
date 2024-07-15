import express from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, login, refreshToken, updateUserById } from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { updateUserBodySchema, addUserBodySchema, loginUserBodySchema } from "../schema/user";
import { paramsSchema } from "../schema/common";
import { Permissions } from "../constants/permissions";

const router = express();

router.post("/login", validateReqBody(loginUserBodySchema), login);
router.post("/refresh-token", refreshToken);

// THESE ROUTES CAN ACCESS ONLY BY ADMIN

//create users
router.post("/", validateReqBody(addUserBodySchema), authenticate, authorize(Permissions.USER_CREATE), createUser);

//get all users
router.get("/", authenticate, authorize(Permissions.USER_GET), getAllUsers);

//get userById
router.get("/:id", validateReqParams(paramsSchema), authenticate, authorize(Permissions.USER_GET), getUserById);

//update userById
router.put("/:id", validateReqParams(paramsSchema), validateReqBody(updateUserBodySchema), authenticate, authorize(Permissions.USER_UPDATE), updateUserById);

//delete userById
router.delete("/:id", validateReqParams(paramsSchema), authenticate, authorize(Permissions.USER_DELETE), deleteUserById);

export default router;
