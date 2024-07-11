import { NextFunction, Request, Response } from "express";
import * as userService from "../service/user";
import { successResponse } from "../utils/response";

// controller function to create a new user.
export async function createUser(req: Request, res: Response) {
    const { body } = req;
    const message = await userService.createUser(body);
    res.json(message);
}

// controller function to handle user login.
export async function login(req: Request, res: Response) {
    const { body } = req;

    const { accessToken, refreshToken } = await userService.login(body);
    res.json({ accessToken, refreshToken });
}

// controller function to refresh access token using refresh token.
export async function refreshToken(req: Request, res: Response) {
    const oldRefreshToken = req.body.refreshToken;

    const message = await userService.refreshToken(oldRefreshToken);

    res.json(message);
}

// controller function to get all users.
export function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = userService.getAllUsers();
        successResponse(res, "Users retrieved successfully", users);
    } catch (error) {
        next(error);
    }
}

//controller function to get a user by ID.
export function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.params;
        const user = userService.getUserById(id);
        successResponse(res, "User retrieved successfully", user);
    } catch (error) {
        next(error);
    }
}

// controller function to update a user by ID.
export function updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        const user = userService.updateUserById(id, username, email);
        successResponse(res, `User with Id: ${id} updated successfully`, user);
    } catch (error) {
        next(error);
    }
}

// controller function to delete a user by ID.
export function deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const user = userService.deleteUserById(id);
        successResponse(res, `User with Id: ${id} deleted successfully`, user);
    } catch (error) {
        next(error);
    }
}
