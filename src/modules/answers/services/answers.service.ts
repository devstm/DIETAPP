import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDTO } from '../dtos/create-answer.dto';
import { REPOSITORIES } from '../../../common/constants';
import { Answer } from '../models/answer.model';
import { Consultation } from '../../../modules/consultation/models/consultation.model';
import { User } from '../../../modules/user/model/users.model';
import { IParam, IReq } from '../../../modules/consultation/interfaces';
import { CustomError } from '../../../common/utils';
import { consultationNotFound, notAuthorize } from '../../../common/messages';
import { Op } from 'sequelize';

@Injectable()
export class AnswersService {
  constructor(
    @Inject(REPOSITORIES.ANSWER_REPOSITORY)
    private readonly answerModel: typeof Answer,
  ) {}

  include = [
    {
      model: Consultation,
      include: [{ model: User }],
    },
    {
      model: User,
    },
  ];

  async index(consultationId: any): Promise<Answer[]> {
    return await this.answerModel.findAll({
      where: {
        [Op.and]: [
          {
            consultationId: consultationId.consultationId,
          },
          {
            isDraft: false,
          },
        ],
      },
      include: this.include,
    });
  }

  async show(param: IParam): Promise<Answer> {
    return await this.answerModel.findOne({
      where: {
        [Op.and]: [
          {
            id: param.answerId,
          },
          {
            isDraft: false,
          },
        ],
      },
      include: this.include,
    });
  }

  async create(answer: CreateAnswerDTO): Promise<Answer> {
    // const { userId, consultationId, isDraft } = answer;
    // const ans = await this.answerModel.findOne({
    //   where: {
    //     [Op.and]: [
    //       {
    //         userId,
    //       },
    //       {
    //         consultationId,
    //       },
    //     ],
    //   },
    // });
    // if (ans && ans.isDraft === isDraft) {
    //   console.log('update');
    //   if (isDraft) throw new CustomError('One Draft allowed', 401);
    //   await this.answerModel.update(
    //     {
    //       ...answer,
    //       isDraft: false,
    //     },
    //     {
    //       where: {
    //         id: ans.id,
    //       },
    //     },
    //   );
    //   return this.answerModel.findByPk(ans.id);
    // }
    return await this.answerModel.create({ ...answer });
  }

  async update(answer: CreateAnswerDTO, user: IReq): Promise<Answer> {
    const { id, userId: uid } = user;
    const task = await this.answerModel.findByPk(id);

    if (!task) {
      throw new CustomError(consultationNotFound, 400);
    }
    if (task.userId != uid) {
      throw new CustomError(notAuthorize, 401);
    }
    await this.answerModel.update(answer, {
      where: { id },
    });
    return this.answerModel.findByPk(id);
  }

  async destroy(user: IReq): Promise<Answer> {
    const { id, userId: uid } = user;
    const task = await this.answerModel.findByPk(id);

    if (!task) {
      throw new CustomError(consultationNotFound, 400);
    }
    if (task.userId != uid) {
      throw new CustomError(notAuthorize, 401);
    }
    await this.answerModel.destroy({
      where: { id },
    });
    return task;
  }
}
