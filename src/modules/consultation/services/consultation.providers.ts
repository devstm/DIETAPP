import { REPOSITORIES } from 'src/common/constants';
import { Consultation } from '../models/consultation.model';

export const consultationProviders = [
  {
    provide: REPOSITORIES.CONSULTATION_REPOSITORY,
    useValue: Consultation,
  },
];
