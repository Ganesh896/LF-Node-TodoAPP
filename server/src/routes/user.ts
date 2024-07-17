import express from "express";
import { createUser, deleteUserById, getUsers, getUserById, login, refreshToken, updateUserById } from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams, validateReqQuery } from "../middleware/validator";
import { userBodySchema, loginUserBodySchema } from "../schema/user";
import { paramsSchema, querySchema } from "../schema/common";

const router = express();

router.post("/login", validateReqBody(loginUserBodySchema), login);
router.post("/refresh-token", refreshToken);

// THESE ROUTES CAN ACCESS ONLY BY ADMIN

//create users
router.post("/", validateReqBody(userBodySchema), authenticate, authorize("users.create"), createUser);

//get all users
router.get("/", validateReqQuery(querySchema), authenticate, authorize("users.get"), getUsers);

//get userById
router.get("/:id", validateReqParams(paramsSchema), authenticate, authorize("users.get"), getUserById);

//update userById
router.put("/:id", validateReqParams(paramsSchema), validateReqBody(userBodySchema), authenticate, authorize("users.update"), updateUserById);

//delete userById
router.delete("/:id", validateReqParams(paramsSchema), authenticate, authorize("users.delete"), deleteUserById);

export default router;
