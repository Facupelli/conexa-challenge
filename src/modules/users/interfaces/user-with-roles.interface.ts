import { Prisma } from '@prisma/client';

export type UserWithRoles = Prisma.UserGetPayload<{
  select: {
    email: true;
    id: true;
    password: true;
    roles: {
      select: {
        name: true;
      };
    };
  };
}>;
