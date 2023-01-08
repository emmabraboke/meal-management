// Update with your config settings.
import { knexSnakeCaseMappers } from 'objection';
import { databaseConfig } from 'src/config/database.config';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: databaseConfig.client,
    connection: databaseConfig.connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
    ...knexSnakeCaseMappers,
  },
};
