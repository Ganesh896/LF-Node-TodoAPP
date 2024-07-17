import { GetQuery } from "../interface/query";
import { User } from "../interface/user";
import { BaseModel } from "./base";

//user model
export class UserModel extends BaseModel {
    // create new user
    static async addUser(user: User) {
        const { name, email, password } = user;
        const userToCreate = {
            name,
            email,
            password,
        };

        await this.queryBuilder().insert(userToCreate).table("users");

        const getUser = await this.queryBuilder().select("id").table("users").where({ email }).first();

        await this.queryBuilder().insert({ user_id: getUser.id, role_id: 2 }).table("userRoles");
    }

    //update User by Id
    static async updateUser(id: string, user: User) {
        const userToUpdate = {
            name: user.name,
            email: user.email,
            password: user.password,
        };

        await this.queryBuilder().update(userToUpdate).table("users").where({ id });
    }

    //get users
    static async getUsers(filter: GetQuery) {
        const { q } = filter;

        const query = this.queryBuilder().select("id", "name", "email").table("users");

        return query;
    }

    // get user by email
    static getUserByEmail(email: string) {
        return this.queryBuilder().select("id", "name", "email", "password").table("users").where({ email }).first();
    }

    //get user by id
    static async getUserById(id: string) {
        const user = await this.queryBuilder().select("id", "name", "email", "password").table("users").where({ id }).first();

        return user;
    }

    //delete user by id
    static async deleteUserById(id: string) {
        const query = await this.queryBuilder().table("users").where({ id }).delete();
        return query;
    }
}
