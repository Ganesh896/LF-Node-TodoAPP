import { User } from "../interface/user";
import * as userModel from "../model/user";
import bcrypt from "bcrypt";
import { generateAccessRefreshToken } from "./auth";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config";

export async function createUser(user: User) {
    if (user.name && user.email && user.password) {
        const password = await bcrypt.hash(user.password, 10);
        user.password = password;
        userModel.createUser(user);

        return { message: "User created successfully!" };
    } else {
        return { message: "name, email & password required" };
    }
}

export async function login(body: Pick<User, "email" | "password">) {
    const currentUser = getUserByEmail(body.email);
    if (!currentUser) {
        return {
            error: "Invalid email or password",
        };
    }
    const isValidPassword = await bcrypt.compare(body.password, currentUser.password);
    if (!isValidPassword) {
        return {
            error: "Invalid email or password",
        };
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(currentUser);

    currentUser.refreshToken = refreshToken;

    return { accessToken, refreshToken };
}

export async function refreshToken(oldRefreshToken: string) {
    if (!oldRefreshToken) {
        return { error: "Unauthorized request" };
    }

    let decodedToken: JwtPayload;
    try {
        decodedToken = verify(oldRefreshToken, config.jwt.secret!) as JwtPayload;
    } catch (error) {
        return { error: "Invalid refresh token" };
    }

    console.log(decodedToken);
    console.log(typeof decodedToken);

    if (typeof decodedToken === "string" || !decodedToken.email) {
        return { error: "Invalid token payload" };
    }

    const user = getUserByEmail(decodedToken.email);
    if (!user) {
        return { error: "Invalid refresh token" };
    }

    if (oldRefreshToken !== user?.refreshToken) {
        return { error: "Refresh token is expired or used" };
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user);

    return { message: "Access token refreshed", tokens: { accessToken, refreshToken } };
}

export function getAllUsers() {
    const data = userModel.getAllUsers();

    if (data.length === 0) {
        return { message: "No users found currently!" };
    }

    return data;
}

export function getUserByEmail(email: string) {
    return userModel.getUserByEmail(email);
}
