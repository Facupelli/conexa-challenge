import { User } from '@prisma/client';
import { Role } from 'src/modules/users/enums/role.enum';
import { UserWithRoles } from 'src/modules/users/users.repository';

export const mockUser: User = {
  id: 1,
  email: 'test@test.com',
  password: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUserWithRole: UserWithRoles = {
  id: 1,
  email: 'test@test.com',
  password: 'test',
  roles: [{ name: Role.USER }],
};

export const mockCreateUserDto = {
  email: 'test@test.com',
  password: 'test',
};
