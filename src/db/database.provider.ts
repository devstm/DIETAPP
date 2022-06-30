import { ConfigService } from '@nestjs/config';

import { Sequelize } from 'sequelize-typescript';
import { Answer } from '../modules/answers/models/answer.model';
import { Consultation } from '../modules/consultation/models/consultation.model';
import { User } from '../modules/user/model/users.model';
import { PROVIDERS, DATABASE_CONFIG } from '../common/constants';

export const databaseProvider = [
  {
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(DATABASE_CONFIG),
        logging: false,
        dialect: 'mysql',
      });
      sequelize.addModels([Consultation, User, Answer]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
