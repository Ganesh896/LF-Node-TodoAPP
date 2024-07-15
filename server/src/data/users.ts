import { User } from "../interface/user";

export const users: User[] = [
    {
        id: "1",
        name: "Admin",
        email: "admin@gmail.com",
        password: "$2b$10$XdVb5H07hrX7GAlW1iAQBupyxiEGQcVfyGD.U2EQ.TIooNyCmWpwS", //admin123
        role: "admin",
        permissions: ["users.get", "users.delete", "users.update", "users.create", "todos.get"],
    },
];