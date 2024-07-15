import { Knex } from "knex";

const TABLE_NAME = "userRoles";

/**
 * Delete existing entries and seed values for table userRoles.
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
                    user_id: 3,
                    role_id: 17,
                },
            ]);
        });
}
