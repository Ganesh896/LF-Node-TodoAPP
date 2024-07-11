import { NextFunction, Request, Response } from "express";
import * as userService from "../service/user";
import { successResponse } from "../utils/response";
import { NotFoundError } from "../error/error";

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

export function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = userService.getAllUsers();
        successResponse(res, "Users retrieved successfully", users);
    } catch (error) {
        next(error);
    }
}

export function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.params;
        const users = userService.getUserById(id);
        successResponse(res, "Users retrieved successfully", users);
    } catch (error) {
        next(error);
    }
}

export function updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        const user = userService.updateUserById(id, username, email);
        successResponse(res, `Users with Id: ${id} updated successfully`, user);
    } catch (error) {
        next(error);
    }
}

export function deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const user = userService.deleteUserById(id);
        successResponse(res, `Users with Id: ${id} deleted successfully`, user);
    } catch (error) {
        next(error);
    }
}
