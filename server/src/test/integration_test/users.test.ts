import request from "supertest";
import express from "express";
import router from "../../routes";
describe("User Integration Test Suite", () => {
    const app = express();
    app.use(express.json());
    app.use(router);
    // login test case
    describe("/login", () => {
        it("Should create user", async () => {
            await request(app)
                .post("/users/login")
                .send({
                    id: "1",
                    name: "Admin",
                    email: "admin@gmail.com",
                    password: "$2b$10$XdVb5H07hrX7GAlW1iAQBupyxiEGQcVfyGD.U2EQ.TIooNyCmWpwS", //admin123
                    permissions: ["admin"],
                });
        });
    });
    /**Fetch all users test case */
    describe("/users", () => {
        it("Should return all users", async () => {
            await request(app).get("/users");
        });
    });

    /**Fetch user by id test case */
    describe("/:id", () => {
        it("Should return user ", async () => {
            await request(app).get("/users/1");
        });
    });

    /**Update user test case */
    describe("/:id", () => {
        it("Should update user", async () => {
            await request(app).put("/users/1").send({
                id: "1",
                name: "user1",
                email: "user1@gmail.com",
                password: "User@123",
            });
        });
    });

    /**Delete user by id */
    describe("Should delete user by id", () => {
        it("Should delete user", async () => {
            await request(app).delete("/users/1");
        });
    });
});
