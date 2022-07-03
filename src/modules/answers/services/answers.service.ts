import { Inject, Injectable } from '@nestjs/common';
import { Op, Transaction } from 'sequelize';
import { CreateAnswerDTO } from '../dtos/create-answer.dto';
import { REPOSITORIES } from '../../../common/constants';
import { Answer } from '../models/answer.model';
import { Consultation } from '../../../modules/consultation/models/consultation.model';
import { User } from '../../../modules/user/model/users.model';
import { IReq } from '../../../modules/consultation/interfaces';
import { CustomError } from '../../../common/utils';
import { consultationNotFound, notAuthorize } from '../../../common/messages';

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

  async getAllAnswers(
    consultationId: number,
    transaction: Transaction,
  ): Promise<Answer[]> {
    return await this.answerModel.findAll({
      where: {
        [Op.and]: [
          {
            consultationId,
          },
          {
            isDraft: false,
          },
        ],
      },
      include: this.include,
      transaction,
    });
  }

  async getOneAnswer(
    answerId: number,
    transaction: Transaction,
  ): Promise<Answer> {
    return await this.answerModel.findOne({
      where: {
        [Op.and]: [
          {
            id: answerId,
          },
          {
            isDraft: false,
          },
        ],
      },
      include: this.include,
      transaction,
    });
  }

  async create(
    answer: CreateAnswerDTO,
    transaction: Transaction,
  ): Promise<Answer> {
    try {
      return await this.answerModel.create({ ...answer }, { transaction });
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    answer: CreateAnswerDTO,
    user: IReq,
    transaction: Transaction,
  ): Promise<Answer> {
    const { id, userId: uid } = user;
    const task = await this.answerModel.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!task) {
      throw new CustomError(consultationNotFound, 400);
    }
    task.update(answer, {
      where: { id },
    });
    return task;
  }

  async destroy(user: IReq, transaction: Transaction): Promise<Answer> {
    const { id, userId: uid } = user;
    const task = await this.answerModel.findOne({
      where: {
        id,
        userId: uid,
      },
      transaction,
    });

    if (!task) {
      throw new CustomError(consultationNotFound, 400);
    }
    await this.answerModel.destroy({
      where: { id },
      transaction,
    });
    return task;
  }
  async verify(user: IReq): Promise<Answer> {
    const { id } = user;
    const task = await this.answerModel.findOne({
      where: {
        id,
      },
    });
    if (!task) {
      throw new CustomError(consultationNotFound, 400);
    }
    task.update({ isVerified: !task.isVerified });
    return task;
  }
}
