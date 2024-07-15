import { Knex } from "knex";

const TABLE_NAME = "rolePermissions";

/**
 * Delete existing entries and seed values for table rolePermissions.
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
                    permission_id: 89,
                    role_id: 17,
                },
            ]);
        });
}
