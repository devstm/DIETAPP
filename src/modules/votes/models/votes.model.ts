import { VIRTUAL } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DeletedAt,
  CreatedAt,
  UpdatedAt,
  DataType,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/model/users.model';
import { Answer } from '../../../modules/answers/models/answer.model';

const { STRING, INTEGER, JSON } = DataType;

@Table({ tableName: 'Votes', underscored: true })
export class Vote extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column(INTEGER)
  user_id: number;

  @ForeignKey(() => Answer)
  @Column(INTEGER)
  answerId: number;

  @Column(STRING)
  vote: string;

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

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Answer)
  answer: Answer;
}
