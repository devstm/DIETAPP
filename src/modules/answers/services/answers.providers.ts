import { REPOSITORIES } from '../../../common/constants';
import { Answer } from '../models/answer.model';

export const answerProviders = [
  {
    provide: REPOSITORIES.ANSWER_REPOSITORY,
    useValue: Answer,
  },
];
