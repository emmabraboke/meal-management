import { Knex } from 'knex';
import { Role } from '../../enum/role.enum';

const tableName = 'users';
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
    table.string('email').notNullable().unique();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('password').notNullable();
    table.enum('role', [Role.ADMIN, Role.USER]).defaultTo(Role.USER);
    table.string('accessToken');
    table.string('refreshToken');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
