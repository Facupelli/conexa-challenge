import { User } from '@prisma/client';
import { Role } from 'src/modules/users/enums/role.enum';

export const mockUser: User = {
  id: 1,
  email: 'test@test.com',
  password: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
  roles: [Role.USER],
};

export const mockCreateUserDto = {
  email: 'test@test.com',
  password: 'test',
  roles: [Role.USER],
};
