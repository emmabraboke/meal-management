import { User } from '../modules/user/entities/user.entity';
import { Brand } from '../modules/brand/entities/brand.entity';
import { Addon } from '../modules/addons/entities/addon.entity';
import { AddonCategory } from '../modules/addons/entities/addonCategory.entity';
import { knexSnakeCaseMappers, Model } from 'objection';
import { knex } from 'knex';
import { ConfigService } from '@nestjs/config';

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
    useFactory: async (configService: ConfigService) => {
      const Knex = knex({
        client: configService.get('app.client'),
        connection: configService.get('app.connection'),
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers,
      });

      Model.knex(Knex);
      return Knex;
    },
    inject: [ConfigService],
  },
];
