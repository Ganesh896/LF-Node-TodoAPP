import { users } from "../data/users";
import { User } from "../interface/user";

let userCounts = users.length;

export function createUser(user: User) {
    const newUser = {
        ...user,
        id: userCounts + 1,
    };
    users.push(newUser);
    userCounts++;
}

export function getAllUsers() {
    return users;
}

export function getUserByEmail(email: string) {
    return users.find(({ email: userEmail }) => userEmail === email);
}
