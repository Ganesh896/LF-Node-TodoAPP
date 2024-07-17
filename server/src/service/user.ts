import { User } from "../interface/user";
import * as userModel from "../model/user";
import bcrypt from "bcrypt";
import { generateAccessRefreshToken } from "./auth";
import { verify } from "jsonwebtoken";
import config from "../config";
import { NotFoundError, UnauthenticatedError } from "../error/error";
import { GetQuery } from "../interface/query";

// create a new user and hash the password
export async function createUser(user: User) {
    const password = await bcrypt.hash(user.password, 10);

    userModel.UserModel.addUser({
        ...user,
        password: password,
    });

    return { message: "User created successfully!" };
}

// login function
export async function login(body: Pick<User, "email" | "password">) {
    const currentUser = await getUserByEmail(body.email);
    console.log(currentUser);
    if (!currentUser) {
        throw new UnauthenticatedError("Invalid email or password");
    }

    // check if the provided password matches the stored hashed password
    const isValidPassword = await bcrypt.compare(body.password, currentUser.password);

    if (!isValidPassword) {
        throw new UnauthenticatedError("Invalid email or password");
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

// retrieve all users
export async function getUsers(query: GetQuery) {
    const data = await userModel.UserModel.getUsers(query);
    if (data.length === 0) {
        return { message: "No users found currently!" };
    }
    return data;
}

// retrieve a user by ID
export async function getUserById(id: string) {
    const user = await userModel.UserModel.getUserById(id);
    if (!user) {
        throw new NotFoundError(`User with Id: ${id} not found`);
    }
    return user;
}

// update a user by ID
export async function updateUserById(id: string, user: User) {
    const password = await bcrypt.hash(user.password, 10);

    userModel.UserModel.updateUser(id, {
        ...user,
        password: password,
    });

    return { message: `User with id: ${id} updated successfully!` };
}

// delete a user by ID
export async function deleteUserById(id: string) {
    const deletedRows = await userModel.UserModel.deleteUserById(id);
    if (deletedRows < 1) {
        throw new NotFoundError(`User with Id: ${id} not found`);
    }
    return { message: "User deleted successfully!" };
}

// retrieve a user by email
export function getUserByEmail(email: string) {
    return userModel.UserModel.getUserByEmail(email);
}
