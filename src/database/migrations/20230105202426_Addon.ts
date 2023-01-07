import { Knex } from 'knex';

const tableName = 'addons';
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
    table.string('name').notNullable();
    table.string('description');
    table.integer('price').notNullable;
    table.string('category');
    table.uuid('brandId').references('id').inTable('brands');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
