import { Module } from '@nestjs/common';
import { AnswersController } from './controllers/answers.controller';
import { answerProviders } from './services/answers.providers';
import { AnswersService } from './services/answers.service';

@Module({
  providers: [AnswersService, ...answerProviders],
  controllers: [AnswersController],
})
export class AnswersModule {}
