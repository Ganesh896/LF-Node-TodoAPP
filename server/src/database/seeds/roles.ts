import { Knex } from "knex";

const TABLE_NAME = "roles";

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
            return knex(TABLE_NAME).insert([
                {
                    role: "admin",
                },
                {
                    role: "user",
                },
            ]);
        })
        .then(() => {
            return knex.raw(`ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 3`);
        });
}
