import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('addonCategories').del();

  // Inserts seed entries
  await knex('addonCategories').insert([{ name: 'rice' }]);
}
