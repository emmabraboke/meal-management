// Update with your config settings.
import { knexSnakeCaseMappers } from 'objection';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'meal',
      user: 'postgres',
      password: '12345',
    },
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
