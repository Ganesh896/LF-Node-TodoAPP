import { Knex } from "knex";
import config from "./config";

export const baseKnexConfig: Knex.Config = {
    client: config.database.client,
    connection: {
        host: config.database.host,
        password: config.database.password,
        database: config.database.name,
        user: config.database.user,
        port: +config.database.port,
    },
};

const knexConfig: Knex.Config = {
    ...baseKnexConfig,
    migrations: {
        directory: "./database/migrations",
        tableName: "migrations",
        extension: "ts",
        stub: "./stubs/migration.stub",
    },

    seeds: {
        directory: "./database/seeds",
        extension: "ts",
        stub: "./stubs/seed.stub",
    },
};

export default knexConfig;
