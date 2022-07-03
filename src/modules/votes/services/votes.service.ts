import { Inject, Injectable } from '@nestjs/common';
import { CustomError } from 'src/common/utils';
import { REPOSITORIES } from '../../../common/constants';
import { Consultation } from '../../../modules/consultation/models/consultation.model';
import { User } from '../../../modules/user/model/users.model';
import { Vote } from '../models/votes.model';

@Injectable()
export class VotesService {
  constructor(
    @Inject(REPOSITORIES.VOTES_REPOSITORY)
    private readonly votesModel: typeof Vote,
  ) {}
  async create(answer: any): Promise<Vote> {
    try {
      const vote = await this.votesModel.create({
        userId: +answer.userId,
        answerId: +answer.answerId,
        vote: answer.vote,
      });
      console.log(vote);
      return vote;
    } catch (e) {
      console.log('in catch');
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new CustomError('Vote already exists', 400);
      }
    }
  }
  async update(answer: any, id: number): Promise<Vote> {
    const vote = await this.votesModel.findByPk(id);
    if (!vote) {
      throw new CustomError('Vote not found', 404);
    }
    await vote.update(answer);
    return vote;
  }
}
