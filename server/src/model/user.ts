import { users } from "../data/users";
import { User } from "../interface/user";

let userCounts = users.length;

// create new user
export function createUser(user: User) {
    const newUser = {
        ...user,
        id: userCounts + 1,
        permissions: ["user"],
    };
    users.push(newUser);
    userCounts++;
}
//get all users
export function getAllUsers() {
    return users;
}
//get user by Id
export function getUserById(id: number) {
    return users.find(({ id: userId }) => userId === id);
}
//updateUser by Id
export function updateUserById(id: number, username: string, email: string) {
    const user = users.find(({ id: userId }) => userId === id);
    if (user) {
        user.name = username;
        user.email = email;
    }

    return user;
}
//delete user by Id
export function deleteUserById(id: number) {
    const userIndex = users.findIndex(({ id: todoId }) => todoId === Number(id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);

        return true;
    }

    return false;
}

export function getUserByEmail(email: string) {
    return users.find(({ email: userEmail }) => userEmail === email);
}
