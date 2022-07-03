import { REPOSITORIES } from '../../../common/constants';
import { Vote } from '../models/votes.model';

export const votesProviders = [
  {
    provide: REPOSITORIES.VOTES_REPOSITORY,
    useValue: Vote,
  },
];
