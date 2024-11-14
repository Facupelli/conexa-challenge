import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findUnique({
      where: { email },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.createUser({
      data: createUserDto,
    });
  }
}
