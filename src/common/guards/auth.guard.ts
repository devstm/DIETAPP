import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '../../modules/user/model/users.model';
import { verifyToken } from '../utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) return false;
    const { userId }: any = await verifyToken(token);
    if (userId) {
      const user = await User.findByPk(userId);
      request.user = user;
      return true;
    }
    return false;
  }
}
