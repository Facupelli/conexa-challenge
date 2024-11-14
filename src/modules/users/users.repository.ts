import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUnique(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User | null> {
    const { where } = params;
    return await this.prisma.user.findUnique({
      where,
    });
  }

  async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    return await this.prisma.user.create({
      data,
    });
  }
}
