import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
    return knex(TABLE_NAME)
        .del()
        .then(() => {
            return knex(TABLE_NAME).insert([
                {
                    name: "Admin",
                    email: "admin@gmail.com",
                    password: "$2b$10$XdVb5H07hrX7GAlW1iAQBupyxiEGQcVfyGD.U2EQ.TIooNyCmWpwS",
                },
            ]);
        });
}
