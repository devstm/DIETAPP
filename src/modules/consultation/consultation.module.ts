import { Module } from '@nestjs/common';
import { ConsultationController } from './controllers/consultation.controller';
import { consultationProviders } from './services/consultation.providers';
import { ConsultationService } from './services/consultation.service';

@Module({
  controllers: [ConsultationController],
  providers: [ConsultationService, ...consultationProviders],
})
export class ConsultationModule {}
