export class User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: number;
  updatedBy: number;
}

export class Consultation {
  id: number;
  title: object;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: number;
  userId: number;
  updatedBy: number;
}
export class Answer {
  title: string;
  description: string;
  recommendations: string;
  isDraft: boolean;
  userId: number;
  consultationId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: number;
  updatedBy: number;
}

type Nullable<T> = T | null;
