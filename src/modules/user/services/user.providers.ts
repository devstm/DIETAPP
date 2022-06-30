import { REPOSITORIES } from 'src/common/constants';
import { User } from '../model/users.model';

export const userProviders = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useValue: User,
  },
];
