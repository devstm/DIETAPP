import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserLoginDTO, UserSignUpDTO } from '../dto';
import { IUser } from '../interfaces';
import { User } from '../model/users.model';
import { UsersService } from '../services/users.service';

@Controller('/')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  signup(@Body() userSignup: UserSignUpDTO): Promise<User> {
    return this.userService.create(userSignup);
  }
  @Post('login')
  login(@Body() userLogin: UserLoginDTO): Promise<IUser> {
    return this.userService.login(userLogin);
  }
  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) id: number): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
