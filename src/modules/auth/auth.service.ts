import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserWithRoles } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserWithRoles> {
    const user: UserWithRoles | null =
      await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = { ...createUserDto, password: hashedPassword };

    await this.usersService.createUser(newUser);
    return this.login(createUserDto);
  }
}
