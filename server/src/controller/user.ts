import { NextFunction, Request, Response } from "express";
import * as userService from "../service/user";
import { successResponse } from "../utils/response";
import { GetQuery } from "../interface/query";

// controller function to create a new user.
export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { body } = req;
        const message = await userService.createUser(body);
        res.json(message);
    } catch (error) {
        next(error);
    }
}

// controller function to handle user login.
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { body } = req;

        const { accessToken, refreshToken } = await userService.login(body);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
}

// controller function to refresh access token using refresh token.
export async function refreshToken(req: Request, res: Response) {
    const oldRefreshToken = req.body.refreshToken;

    const message = await userService.refreshToken(oldRefreshToken);

    res.json(message);
}

// controller function to get all users.
export async function getUsers(req: Request<any, any, any, GetQuery>, res: Response, next: NextFunction) {
    try {
        const { query } = req;
        const users = await userService.getUsers(query);
        successResponse(res, "Users retrieved successfully", users);
    } catch (error) {
        next(error);
    }
}

//controller function to get a user by ID.
export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        let { id } = req.params;
        const user = await userService.getUserById(id);
        successResponse(res, "User retrieved successfully", user);
    } catch (error) {
        next(error);
    }
}

// controller function to update a user by ID.
export async function updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { body } = req;
        console.log(body);
        const response = await userService.updateUserById(id, body);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

// controller function to delete a user by ID.
export async function deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const message = await userService.deleteUserById(id);
        res.json(message);
    } catch (error) {
        next(error);
    }
}
