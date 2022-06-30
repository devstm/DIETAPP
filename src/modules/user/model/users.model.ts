import {
  Table,
  Column,
  Model,
  DeletedAt,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Answer } from '../../../modules/answers/models/answer.model';
import { Consultation } from '../../../modules/consultation/models/consultation.model';

const { STRING, INTEGER } = DataType;

@Table
export class User extends Model {
  @Column(STRING)
  username: string;

  @Column(STRING)
  email: string;

  @Column(STRING)
  firstName: string;

  @Column(STRING)
  middleName: string;

  @Column(STRING)
  lastName: string;

  @Column(STRING)
  password: string;

  @Column(STRING)
  role: string;

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

  @HasMany(() => Consultation)
  consultation: Consultation[];

  @HasMany(() => Answer)
  answer: Answer[];
}
