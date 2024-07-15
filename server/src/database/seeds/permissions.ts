import { Knex } from "knex";

const TABLE_NAME = "permissions";

/**
 * Delete existing entries and seed values for table permissions.
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
                    permission: "users.create",
                },
                {
                    permission: "users.get",
                },
                {
                    permission: "users.update",
                },
                {
                    permission: "users.delete",
                },
                {
                    permission: "todos.create",
                },
                {
                    permission: "todos.get",
                },
                {
                    permission: "todos.update",
                },
                {
                    permission: "todos.delete",
                },
            ]);
        });
}
