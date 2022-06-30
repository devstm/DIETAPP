import { Inject, Injectable } from '@nestjs/common';
import { CreateAskDTO } from '../dtos';
import { REPOSITORIES } from '../../../common/constants';
import { consultationNotFound, notAuthorize } from '../../../common/messages';
import { CustomError } from '../../../common/utils';
import { Consultation } from '../models/consultation.model';
import { IReq } from '../interfaces';
import { Answer } from '../../../modules/answers/models/answer.model';
import { fn, col } from 'sequelize';
import { User } from '../../../modules/user/model/users.model';

@Injectable()
export class ConsultationService {
  constructor(
    @Inject(REPOSITORIES.CONSULTATION_REPOSITORY)
    private readonly consultationModel: typeof Consultation,
  ) {}

  async index(params: any): Promise<any> {
    const { page } = params;
    return await this.consultationModel.findAll({
      include: [
        {
          model: Answer,
          attributes: [
            'id',
            'userId',
            'recommendations',
            'title',
            'description',
          ],
        },
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
      group: ['consultation.id'],
      offset: (page - 1) * 10,
      limit: 10,
      order: [
        [fn('COUNT', col('answers.id')), 'ASC'],
        ['createdAt', 'ASC'],
      ],
      subQuery: false,
    });
  }

  async create(consultation: CreateAskDTO): Promise<Consultation> {
    const { title, description, userId } = consultation;
    return await this.consultationModel.create({ title, description, userId });
  }

  async update(consultation: CreateAskDTO, user: IReq): Promise<Consultation> {
    const { id, userId: uid } = user;
    const task = await this.consultationModel.findByPk(id);

    if (!task) {
      throw new CustomError(consultationNotFound, 400);
    }
    if (task.userId != uid) {
      throw new CustomError(notAuthorize, 401);
    }
    await this.consultationModel.update(consultation, {
      where: { id },
    });
    return this.consultationModel.findByPk(id);
  }

  async destroy(user: IReq): Promise<Consultation> {
    const { id, userId: uid } = user;
    const task = await this.consultationModel.findByPk(id);

    if (!task) {
      throw new CustomError(consultationNotFound, 400);
    }
    if (task.userId != uid) {
      throw new CustomError(notAuthorize, 401);
    }
    await this.consultationModel.destroy({
      where: { id },
    });
    return task;
  }
}
