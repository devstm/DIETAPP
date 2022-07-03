import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { ConfigModule } from '@nestjs/config';
import configFile from '../config';
import { UsersModule } from './modules/user/users.module';
import { ConsultationModule } from './modules/consultation/consultation.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guards';
import { AnswersModule } from './modules/answers/answers.module';
import { TransactionInterceptor } from './common/interceptors/transaction.interceptor';
import { Sequelize } from 'sequelize-typescript';
import { VotesModule } from './modules/votes/votes.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
    UsersModule,
    ConsultationModule,
    AnswersModule,
    VotesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
