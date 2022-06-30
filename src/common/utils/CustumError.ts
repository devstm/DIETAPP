import { HttpException } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(msg: string, status: number) {
    super(msg, status);
  }
}
