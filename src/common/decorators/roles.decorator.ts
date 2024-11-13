import { SetMetadata } from '@nestjs/common';
import { Role } from 'prisma/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
