import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { compare } from 'bcryptjs';
import { UserLoginDTO, UserSignUpDTO } from '../dto';
import { IUser } from '../interfaces';
import { REPOSITORIES } from '../../../common/constants';
import { CustomError, signToken } from '../../../common/utils';
import { CheckUsers, hashPassword } from '../utils';
import { userNotFound, wrongPassword } from '../../../common/messages';
import { User } from '../model/users.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userModel: typeof User,
  ) {}

  async create(userSignup: UserSignUpDTO): Promise<User> {
    await CheckUsers(userSignup);
    const user2insert = await hashPassword(userSignup);
    return await this.userModel.create(user2insert);
  }

  async login(userType: UserLoginDTO): Promise<IUser> {
    // login with email or password
    const { username, password } = userType;
    const user = await this.userModel.findOne({
      where: {
        [Op.or]: [{ email: username }, { username: username }],
      },
    });
    if (!user) throw new CustomError(userNotFound, 400);
    const isValid = await compare(password, user.password);
    if (!isValid) throw new CustomError(wrongPassword, 400);
    const token: any = await signToken(user.id);
    return { user, token };
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) throw new CustomError(userNotFound, 400);
    await user.destroy();
    return user;
  }
  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) throw new CustomError(userNotFound, 400);
    return user;
  }
}
