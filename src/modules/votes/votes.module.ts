import { Module } from '@nestjs/common';
import { VotesController } from './controllers/votes.controller';
import { votesProviders } from './services/votes.providers';
import { VotesService } from './services/votes.service';

@Module({
  controllers: [VotesController],
  providers: [VotesService, ...votesProviders],
})
export class VotesModule {}
