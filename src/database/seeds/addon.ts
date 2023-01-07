import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('addons').del();

  // Inserts seed entries
  await knex('addons').insert([
    { name: 'nestle', description: 'fried rice', price: 600, category: 'rice' },
  ]);
}
