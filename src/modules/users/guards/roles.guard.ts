import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ReqUser } from 'src/modules/auth/interfaces/req-user.interface';
import { Role } from 'src/modules/users/enums/role.enum';

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
