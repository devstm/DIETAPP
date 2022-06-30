import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums';
import { verifyToken } from '../utils';
import { User } from '../../modules/user/model/users.model';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) return false;
    const { userId }: any = await verifyToken(token);
    if (userId) {
      const user = await User.findByPk(userId);
      request.user = user;
    }
    return requiredRoles.some((role) => request.user.role?.includes(role));
  }
}
