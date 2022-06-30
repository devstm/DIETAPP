import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateAnswerDTO } from '../dtos/create-answer.dto';
import { Role } from '../../../common/enums';
import { AuthGuard } from '../../../common/guards';
import { Roles, User } from '../../../common/decorators';
import { Answer } from '../models/answer.model';
import { AnswersService } from '../services/answers.service';
import { IParam, IReq } from '../../../modules/consultation/interfaces';

@Controller('answers')
export class AnswersController {
  constructor(private answersService: AnswersService) {}
  // Return the answers to the consultation
  @UseGuards(AuthGuard)
  @Get('consult/:consultationId')
  index(@Param() consultationId: object): Promise<Answer[]> {
    return this.answersService.index(consultationId);
  }

  @UseGuards(AuthGuard)
  @Get('/:answerId')
  show(@Param() answerId: IParam): Promise<Answer> {
    return this.answersService.show(answerId);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Consultant)
  @Post('/')
  store(@Body() answer: CreateAnswerDTO): Promise<Answer> {
    return this.answersService.create(answer);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Consultant)
  @Put('/:id')
  update(@Body() answer: CreateAnswerDTO, @User() user: IReq): Promise<Answer> {
    return this.answersService.update(answer, user);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Consultant)
  @Delete('/:id')
  destroy(@User() user: IReq): Promise<Answer> {
    return this.answersService.destroy(user);
  }
}
