import {
  Table,
  Column,
  Model,
  DeletedAt,
  CreatedAt,
  UpdatedAt,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Consultation } from '../../../modules/consultation/models/consultation.model';
import { User } from '../../../modules/user/model/users.model';

const { STRING, INTEGER, BOOLEAN } = DataType;

@Table({ underscored: true })
export class Answer extends Model {
  @Column(STRING)
  title: string;

  @Column(STRING)
  description: string;

  @Column(STRING)
  recommendations: string;

  @Column(BOOLEAN)
  isDraft: boolean;

  @Column(BOOLEAN)
  isVerified: boolean;

  @ForeignKey(() => User)
  @Column(INTEGER)
  userId: number;

  @ForeignKey(() => Consultation)
  @Column(INTEGER)
  consultationId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @Column(INTEGER)
  createdBy: number;

  @Column(INTEGER)
  updatedBy: number;

  @BelongsTo(() => Consultation)
  consultation: Consultation;

  @BelongsTo(() => User)
  user: User;
}
