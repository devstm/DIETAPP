import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { CreateAnswerDTO } from '../dtos/create-answer.dto';
import { Role } from '../../../common/enums';
import { AuthGuard } from '../../../common/guards';
import { Roles, User } from '../../../common/decorators';
import { Answer } from '../models/answer.model';
import { AnswersService } from '../services/answers.service';
import { IReq } from '../../../modules/consultation/interfaces';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { TransactionParam } from 'src/common/decorators/transaction-params.decorator';

@UseGuards(AuthGuard)
@Controller('answers')
export class AnswersController {
  constructor(private answersService: AnswersService) {}
  // Return the answers to the consultation
  @Get('consult/:consultationId')
  getAllAnswers(
    @Param('consultationId', ParseIntPipe) consultationId: number,
    @TransactionParam() transaction: Transaction,
  ): Promise<Answer[]> {
    return this.answersService.getAllAnswers(consultationId, transaction);
  }

  @Get('/:answerId')
  getOneAnswer(
    @Param('answerId', ParseIntPipe) answerId: number,
    @TransactionParam() transaction: Transaction,
  ): Promise<Answer> {
    return this.answersService.getOneAnswer(answerId, transaction);
  }

  @Roles(Role.Consultant)
  @Post('/')
  create(
    @Body() createAnswerDTO: CreateAnswerDTO,
    @TransactionParam() transaction: Transaction,
  ): Promise<Answer> {
    return this.answersService.create(createAnswerDTO, transaction);
  }

  @Roles(Role.Consultant)
  @Patch('/:id')
  update(
    @Body() createAnswerDTO: CreateAnswerDTO,
    @User() user: IReq,
    @TransactionParam() transaction: Transaction,
  ): Promise<Answer> {
    console.log(user);
    return this.answersService.update(createAnswerDTO, user, transaction);
  }

  @Roles(Role.Consultant)
  @Delete('/:id')
  destroy(
    @User() user: IReq,
    @TransactionParam() transaction: Transaction,
  ): Promise<Answer> {
    return this.answersService.destroy(user, transaction);
  }

  @Roles(Role.Moderator)
  @Patch('/:id/verify')
  verify(@User() user: IReq): Promise<Answer> {
    return this.answersService.verify(user);
  }
}
