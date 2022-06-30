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
import { User, Roles } from '../../../common/decorators';
import { Role } from '../../../common/enums';
import { AuthGuard } from '../../../common/guards';
import { CreateAskDTO } from '../dtos';
import { IReq } from '../interfaces';
import { Consultation } from '../models/consultation.model';
import { ConsultationService } from '../services/consultation.service';

@Controller('asks')
export class ConsultationController {
  constructor(private consultationService: ConsultationService) {}

  @Get('/:page')
  index(@Param() page: number): Promise<Consultation[]> {
    return this.consultationService.index(page);
  }
  @Roles(Role.User)
  @UseGuards(AuthGuard)
  @Post('/')
  store(@Body() ask: CreateAskDTO): Promise<Consultation> {
    return this.consultationService.create(ask);
  }
  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Put(':id')
  update(@Body() ask: CreateAskDTO, @User() user: IReq): Promise<Consultation> {
    return this.consultationService.update(ask, user);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Delete(':id')
  destroy(@User() user: IReq): Promise<Consultation> {
    return this.consultationService.destroy(user);
  }
}
