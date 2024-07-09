import express from "express";
import { createUser, getAllUsers, login, refreshToken } from "../controller/user";

const router = express();

router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/", createUser);
router.get("/", getAllUsers);

export default router;
