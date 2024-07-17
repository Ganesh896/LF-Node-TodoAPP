import { ConflictError } from "../error/error";
import { GetQuery } from "../interface/query";
import { User } from "../interface/user";
import { BaseModel } from "./base";

//user model
export class UserModel extends BaseModel {
    // create new user
    static async addUser(user: User) {
        try {
            const { name, email, password } = user;
            const userToCreate = {
                name,
                email,
                password,
            };

            await this.queryBuilder().insert(userToCreate).table("users");

            const getUser = await this.queryBuilder().select("id").table("users").where({ email }).first();

            await this.queryBuilder().insert({ user_id: getUser.id, role_id: 2 }).table("userRoles");
        } catch (error) {
            throw new ConflictError("User with this email is already Exists");
        }
    }

    //update User by Id
    static updateUser(id: string, user: User) {
        const userToUpdate = {
            name: user.name,
            email: user.email,
            password: user.password,
        };

        return this.queryBuilder().update(userToUpdate).table("users").where({ id });
    }

    //get users
    static getUsers(filter: GetQuery) {
        const { q } = filter;

        // const query = this.queryBuilder().select("id", "name", "email").table("users");
        const query = this.queryBuilder()
            .select("id", "name", "email")
            .table("users")
            .limit(filter.size!)
            .offset((filter.page! - 1) * filter.size!);

        if (q) {
            // query.where({ name: q });
            query.whereLike("name", `%${q}%`);
        }

        return query;
    }

    // get user by email
    static getUserByEmail(email: string) {
        return this.queryBuilder().select("id", "name", "email", "password").table("users").where({ email }).first();
    }

    //get user by id
    static getUserById(id: string) {
        return this.queryBuilder().select("id", "name", "email", "password").table("users").where({ id }).first();
    }

    //delete user by id
    static deleteUserById(id: string) {
        return this.queryBuilder().table("users").where({ id }).delete();
    }
}
