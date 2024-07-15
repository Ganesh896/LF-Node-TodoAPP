import bcrypt from "bcrypt";
import sinon from "sinon";

import * as userModel from "../../../model/user";
import * as authService from "../../../service/auth";
import { createUser, deleteUserById, getAllUsers, getUserByEmail, getUserById, login, updateUserById } from "../../../service/user";
import expect from "expect";
import { NotFoundError } from "../../../error/error";

describe("User Sevice Test Suite", () => {
    //user creation test
    describe("User creation", () => {
        let bcryptHashStub: sinon.SinonStub;
        let userModelLoginUserStub: sinon.SinonStub;

        beforeEach(() => {
            bcryptHashStub = sinon.stub(bcrypt, "hash"); //stubing bcrypt.hash() function
            userModelLoginUserStub = sinon.stub(userModel, "createUser"); //stubing userModel.createUser() function
        });

        afterEach(() => {
            bcryptHashStub.restore();
            userModelLoginUserStub.restore();
        });

        it("Should create a new user", async () => {
            bcryptHashStub.resolves("hashedPassword");

            const user = {
                id: "1",
                name: "Test",
                email: "test@gmail.com",
                password: "test123",
                permissions: [],
            };

            const response = await createUser(user);

            expect(bcryptHashStub.callCount).toBe(1);
            expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);

            expect(userModelLoginUserStub.callCount).toBe(1);
            expect(userModelLoginUserStub.getCall(0).args).toStrictEqual([
                {
                    ...user,
                    password: "hashedPassword",
                },
            ]);

            expect(response).toStrictEqual({ message: "User created successfully!" });
        });
    });

    // user login test
    describe("User Service Login", () => {
        let getUserByEmailStub: sinon.SinonStub;
        let bcryptCompareStub: sinon.SinonStub;
        let generateAccessRefreshTokenStub: sinon.SinonStub;

        beforeEach(() => {
            getUserByEmailStub = sinon.stub(userModel, "getUserByEmail");
            bcryptCompareStub = sinon.stub(bcrypt, "compare");
            generateAccessRefreshTokenStub = sinon.stub(authService, "generateAccessRefreshToken");
        });

        afterEach(() => {
            getUserByEmailStub.restore();
            bcryptCompareStub.restore();
            generateAccessRefreshTokenStub.restore();
        });

        it("should return error for invalid email", async () => {
            getUserByEmailStub.returns(null);

            const response = await login({ email: "invalid@example.com", password: "password123" });

            expect(response).toStrictEqual({ error: "Invalid email or password" });
            expect(getUserByEmailStub.callCount).toBe(1);
            expect(bcryptCompareStub.callCount).toBe(0);
            expect(generateAccessRefreshTokenStub.callCount).toBe(0);
        });

        it("should return error for invalid password", async () => {
            getUserByEmailStub.returns({ email: "test@example.com", password: "hashedPassword" }); //reuring obj
            bcryptCompareStub.resolves(false); //resolving promise

            const response = await login({ email: "test@example.com", password: "wrongPassword" });

            expect(response).toStrictEqual({ error: "Invalid email or password" });
            expect(getUserByEmailStub.callCount).toBe(1);
            expect(bcryptCompareStub.callCount).toBe(1);
            expect(generateAccessRefreshTokenStub.callCount).toBe(0);
        });

        it("should return tokens for valid credentials", async () => {
            const user = { email: "test@example.com", password: "hashedPassword" };
            const tokens = { accessToken: "accessToken", refreshToken: "refreshToken" };

            getUserByEmailStub.returns(user);
            bcryptCompareStub.resolves(true);
            generateAccessRefreshTokenStub.resolves(tokens);

            const response = await login({ email: "test@example.com", password: "password123" });

            expect(response).toStrictEqual(tokens);
            expect(getUserByEmailStub.callCount).toBe(1);
            expect(bcryptCompareStub.callCount).toBe(1);
            expect(generateAccessRefreshTokenStub.callCount).toBe(1);
        });
    });

    // get All Users Test
    describe("Get All Users", () => {
        let userModelGetAllUsersStub: sinon.SinonStub;

        beforeEach(() => {
            userModelGetAllUsersStub = sinon.stub(userModel, "getAllUsers");
        });

        afterEach(() => {
            userModelGetAllUsersStub.restore();
        });

        it("Should return all users", () => {
            const users = [
                {
                    id: "1",
                    name: "Admin",
                    email: "admin@gmail.com",
                    password: "$2b$10$XdVb5H07hrX7GAlW1iAQBupyxiEGQcVfyGD.U2EQ.TIooNyCmWpwS",
                    permissions: ["admin"],
                },
            ];
            userModelGetAllUsersStub.returns(users);

            const response = getAllUsers();

            // Assert that the result matches the expectedUsers array
            expect(response).toStrictEqual(users);
            expect(userModelGetAllUsersStub.callCount).toBe(1);
            expect(userModelGetAllUsersStub.getCall(0).args).toStrictEqual([]);
        });
    });

    //get User By Id Test
    describe("getUserById", () => {
        let userModelGetUserByIdStub: sinon.SinonStub;
        beforeEach(() => {
            userModelGetUserByIdStub = sinon.stub(userModel, "getUserById");
        });
        afterEach(() => {
            userModelGetUserByIdStub.restore();
        });
        // User found case
        it("Should return user if user found", () => {
            const mockedUser = {
                id: "0",
                name: "test name",
                email: "test@gmail.com",
                password: "test",
                permissions: ["user"],
            };
            userModelGetUserByIdStub.returns(mockedUser);
            const response = getUserById("0");
            expect(response).toStrictEqual(mockedUser);
            expect(userModelGetUserByIdStub.callCount).toBe(1);
            expect(userModelGetUserByIdStub.getCall(0).args).toStrictEqual(["0"]);
        });

        // User not found case
        it("Should throw error if user is not found", () => {
            userModelGetUserByIdStub.returns(null);
            expect(() => getUserById("100")).toThrow(new NotFoundError("User with Id: 100 not found"));
            expect(userModelGetUserByIdStub.callCount).toBe(1);
            expect(userModelGetUserByIdStub.getCall(0).args).toStrictEqual(["100"]);
        });
    });

    // update User Test
    describe("updateUserById", () => {
        let userModelUpdateUserByIdStub: sinon.SinonStub;

        beforeEach(() => {
            userModelUpdateUserByIdStub = sinon.stub(userModel, "updateUserById");
        });

        afterEach(() => {
            userModelUpdateUserByIdStub.restore();
        });

        it("should throw an error when user is not found", () => {
            userModelUpdateUserByIdStub.returns(null);

            expect(() => updateUserById("100", "newUsername", "newEmail@example.com")).toThrow(new NotFoundError("User with Id: 100 not found"));
        });

        it("should return the updated user if user is found", () => {
            const updatedUser = {
                id: "1",
                name: "newUsername",
                email: "newEmail@example.com",
                password: "existingPassword",
                permissions: [],
            };
            userModelUpdateUserByIdStub.returns(updatedUser);

            const result = updateUserById("1", "newUsername", "newEmail@example.com");

            expect(result).toStrictEqual(updatedUser);
        });
    });

    // update User Test
    describe("deleteUserById", () => {
        let userModelDeleteUserByIdStub: sinon.SinonStub;

        beforeEach(() => {
            userModelDeleteUserByIdStub = sinon.stub(userModel, "deleteUserById");
        });

        afterEach(() => {
            userModelDeleteUserByIdStub.restore();
        });

        it("should throw an error when user is not found", () => {
            userModelDeleteUserByIdStub.returns(null);

            expect(() => deleteUserById("100")).toThrow(new NotFoundError("User with Id: 100 not found"));
        });

        it("should return a success message when user is deleted", () => {
            userModelDeleteUserByIdStub.returns(true);

            const result = deleteUserById("1");

            expect(result).toStrictEqual({ message: "User deleted successfully!" });
        });
    });

    // delete user by id Test
    describe("deleteUserById", () => {
        let userModelDeleteUserByIdStub: sinon.SinonStub;

        beforeEach(() => {
            userModelDeleteUserByIdStub = sinon.stub(userModel, "deleteUserById");
        });

        afterEach(() => {
            userModelDeleteUserByIdStub.restore();
        });

        it("should throw an error when user is not found", () => {
            userModelDeleteUserByIdStub.returns(null);

            expect(() => deleteUserById("100")).toThrow(new NotFoundError("User with Id: 100 not found"));
        });

        it("should return a success message when user is deleted", () => {
            userModelDeleteUserByIdStub.returns(true);

            const result = deleteUserById("1");

            expect(result).toStrictEqual({ message: "User deleted successfully!" });
        });
    });

    // get user by email Test
    describe.only("getUserByEmail", () => {
        let userModelGetUserByEmailStub: sinon.SinonStub;

        beforeEach(() => {
            userModelGetUserByEmailStub = sinon.stub(userModel, "getUserByEmail");
        });

        afterEach(() => {
            userModelGetUserByEmailStub.restore();
        });

        it("should return the user when user is found", () => {
            const user = {
                id: "1",
                name: "Test",
                email: "test@test.com",
                password: "test1234",
                permissions: [],
            };
            userModelGetUserByEmailStub.returns(user);

            const result = getUserByEmail("test@test.com");

            expect(result).toStrictEqual(user);
        });

        it("should return null when user is not found", () => {
            userModelGetUserByEmailStub.returns(null);

            const result = getUserByEmail("nonexistent@test.com");

            expect(result).toBe(null);
        });
    });
});
