import { Knex } from "knex";

const TABLE_NAME = "role_permissions ";

/**
 * Create table role_permissions.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements();

        table.bigint("permission_id").notNullable().references("id").inTable("permissions").onDelete("cascade");

        table.bigint("role_id").notNullable().references("id").inTable("roles").onDelete("cascade");

        table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

        table.bigInteger("created_by").unsigned().nullable().references("id").inTable(TABLE_NAME);

        table.timestamp("updated_at").nullable();

        table.bigInteger("updated_by").unsigned().references("id").inTable(TABLE_NAME).nullable();
    });
}

/**
 * Drop table role_permissions.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE_NAME);
}
