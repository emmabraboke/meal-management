import { User } from '../modules/user/entities/user.entity';
import { Brand } from '../modules/brand/entities/brand.entity';
import { Addon } from '../modules/addons/entities/addon.entity';
import { AddonCategory } from '../modules/addons/entities/addon-category.entity';
import { knexSnakeCaseMappers, Model } from 'objection';
import { knex } from 'knex';
import { databaseConfig } from 'src/config/database.config';

const models = [User, Brand, Addon, AddonCategory];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

export const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const Knex = knex({
        client: databaseConfig.client,
        connection: databaseConfig.connection,
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers,
      });

      Model.knex(Knex);
      return Knex;
    },
  },
];
