import { users } from "../data/users";
import { User } from "../interface/user";

let userCounts = 1;

// create new user
export function createUser(user: User) {
    userCounts++;
    const newUser = {
        ...user,
        id: userCounts + "",
        permissions: ["user"],
    };
    users.push(newUser);
}

//get all users
export function getAllUsers() {
    return users;
}
//get user by Id
export function getUserById(userId: string) {
    const user = users.find((user) => userId === user.id);
    return user;
}
//updateUser by Id
export function updateUserById(id: string, username: string, email: string) {
    const user = users.find(({ id: userId }) => userId === id);
    if (user) {
        user.name = username;
        user.email = email;
    }

    return user;
}
//delete user by Id
export function deleteUserById(id: string) {
    const userIndex = users.findIndex(({ id: todoId }) => todoId === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return true;
    }

    return false;
}

export function getUserByEmail(email: string) {
    return users.find(({ email: userEmail }) => userEmail === email);
}
