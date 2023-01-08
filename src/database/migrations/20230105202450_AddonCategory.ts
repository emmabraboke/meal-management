import { Knex } from 'knex';

const tableName = 'addonCategories';
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
    table.string('name').unique().notNullable();
    table.uuid('brandId').references('id').inTable('brands');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
