import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './common/decorators/roles.decorator';
import { Role } from 'prisma/role.enum';
import { RolesGuard } from './modules/users/guards/roles.guard';

@Controller({ version: '1', path: 'protected' })
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'HOLA MUNDO';
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('admin')
  getAdminHello(): string {
    return 'HOLA ADMIN MUNDO';
  }
}
