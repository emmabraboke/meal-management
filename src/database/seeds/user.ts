import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      firstName: 'Emmanuel',
      lastName: 'Braboke',
      email: 'emma@gmail.com',
      password: '1244',
    },
  ]);
}
