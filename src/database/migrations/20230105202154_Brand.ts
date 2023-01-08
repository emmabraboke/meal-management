import { Knex } from 'knex';

const tableName = 'brands';
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
    table.string('name').notNullable().unique();
    table.uuid('userId').references('id').inTable('users');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
