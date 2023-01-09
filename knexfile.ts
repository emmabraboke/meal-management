// Update with your config settings.
import { knexSnakeCaseMappers } from 'objection';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: process.env.CLIENT,
  connection: process.env.DATABASE_URL || {
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
  ...knexSnakeCaseMappers,
};
