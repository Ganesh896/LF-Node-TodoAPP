import { Knex } from "knex";

const TABLE_NAME = "roles";

const roles = ["admin", "user"];

/**
 * Delete existing entries and seed values for table roles.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
    return knex(TABLE_NAME)
        .del()
        .then(() => {
            return knex(TABLE_NAME).del();
        })
        .then(() => {
            return knex(TABLE_NAME).insert(roles.map((role, index) => ({ role, id: index + 1 })));
        })
        .then(() => {
            return knex.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 3`);
        });
}
