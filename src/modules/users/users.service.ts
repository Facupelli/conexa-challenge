import { Injectable } from '@nestjs/common';
import { UsersRepository, UserWithRoles } from './users.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<UserWithRoles | null> {
    return this.usersRepository.findUnique({ where: { email } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser({ data: createUserDto });
  }
}
