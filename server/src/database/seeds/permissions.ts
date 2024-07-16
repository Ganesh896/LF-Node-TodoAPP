import { Knex } from "knex";

const TABLE_NAME = "permissions";

const permissions = ["users.create", "users.get", "users.update", "users.delete", "todos.create", "todos.update", "todos.get", "todos.delete"];

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
            return knex(TABLE_NAME).insert(permissions.map((permission, index) => ({ permission, id: index + 1 })));
        });
}
