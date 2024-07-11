import { User } from "../interface/user";
import * as userModel from "../model/user";
import bcrypt from "bcrypt";
import { generateAccessRefreshToken } from "./auth";
import { verify } from "jsonwebtoken";
import config from "../config";
import { NotFoundError } from "../error/error";

// login function
export async function login(body: Pick<User, "email" | "password">) {
    const currentUser = getUserByEmail(body.email);
    if (!currentUser) {
        return {
            error: "Invalid email or password",
        };
    }

    // check if the provided password matches the stored hashed password
    const isValidPassword = await bcrypt.compare(body.password, currentUser.password);

    if (!isValidPassword) {
        return {
            error: "Invalid email or password",
        };
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(currentUser);
    return { accessToken, refreshToken };
}

// function to refresh tokens using the old refresh token
export async function refreshToken(oldRefreshToken: string) {
    if (!oldRefreshToken) {
        return { error: "Unauthorized request" };
    }

    let decodedUser: User;
    try {
        decodedUser = verify(oldRefreshToken, config.jwt.secret!) as User;
    } catch (error) {
        return { error: "Invalid refresh token" };
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(decodedUser);
    return { message: "Access token refreshed", tokens: { accessToken, refreshToken } };
}

// create a new user and hash the password
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

// retrieve all users
export function getAllUsers() {
    const data = userModel.getAllUsers();
    if (data.length === 0) {
        return { message: "No users found currently!" };
    }
    return data;
}

// retrieve a user by ID
export function getUserById(id: string) {
    const user = userModel.getUserById(id);
    if (!user) {
        throw new NotFoundError(`User with Id: ${id} not found`);
    }
    return user;
}

// update a user by ID
export function updateUserById(id: string, username: string, email: string) {
    const user = userModel.updateUserById(id, username, email);
    if (!user) {
        throw new NotFoundError(`User with Id: ${id} not found`);
    }
    return user;
}

// delete a user by ID
export function deleteUserById(id: string) {
    const resp = userModel.deleteUserById(id);
    if (!resp) {
        throw new NotFoundError(`User with Id: ${id} not found`);
    }
    return { message: "User deleted successfully!" };
}

// retrieve a user by email
export function getUserByEmail(email: string) {
    return userModel.getUserByEmail(email);
}
