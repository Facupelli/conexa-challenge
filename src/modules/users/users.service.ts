import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserWithRoles } from './interfaces/user-with-roles.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<UserWithRoles | null> {
    const user: UserWithRoles | null = await this.usersRepository.findUnique({
      where: { email },
    });

    if (user === null) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.createUser({ data: createUserDto });
  }
}
