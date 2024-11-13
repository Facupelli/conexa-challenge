import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'prisma/role.enum';
import { ReqUser } from 'types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles === undefined) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user: ReqUser = req.user;

    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
