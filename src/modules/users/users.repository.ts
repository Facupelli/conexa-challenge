import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserWithRoles } from './interfaces/user-with-roles.interface';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUnique(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<UserWithRoles | null> {
    const { where } = params;
    return await this.prisma.user.findUnique({
      where,
      select: {
        email: true,
        id: true,
        password: true,
        roles: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    return await this.prisma.user.create({
      data,
    });
  }
}
