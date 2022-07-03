import { Body, Controller, Post } from '@nestjs/common';
import { VotesService } from '../services/votes.service';

@Controller('votes')
export class VotesController {
  constructor(private userService: VotesService) {}

  @Post('/')
  signup(@Body() userSignup: any): Promise<any> {
    return this.userService.create(userSignup);
  }
}
