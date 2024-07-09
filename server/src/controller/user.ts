import { Request, Response } from "express";
import * as userService from "../service/user";

export async function createUser(req: Request, res: Response) {
    const { body } = req;
    const message = await userService.createUser(body);
    res.json(message);
}

export async function login(req: Request, res: Response) {
    const { body } = req;

    const { accessToken, refreshToken } = await userService.login(body);

    res.json({ accessToken, refreshToken });
}

export async function refreshToken(req: Request, res: Response) {
    const oldRefreshToken = req.body.refreshToken;

    const message = await userService.refreshToken(oldRefreshToken);

    res.json(message);
}

export function getAllUsers(req: Request, res: Response) {
    const users = userService.getAllUsers();

    res.json(users);
}
