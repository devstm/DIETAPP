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
  HasMany,
} from 'sequelize-typescript';
import { Answer } from '../../../modules/answers/models/answer.model';
import { User } from '../../../modules/user/model/users.model';

const { STRING, JSON, INTEGER } = DataType;

@Table
export class Consultation extends Model {
  @Column(JSON)
  title: object;

  @Column(STRING)
  description: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @Column(INTEGER)
  createdBy: number;

  @ForeignKey(() => User)
  @Column(INTEGER)
  userId: number;

  @Column(INTEGER)
  updatedBy: number;

  @HasMany(() => Answer)
  answers: Answer[];

  @BelongsTo(() => User)
  user: User;
}
