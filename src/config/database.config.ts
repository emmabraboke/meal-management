import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
  connection: {
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
  client: process.env.CLIENT,
};
