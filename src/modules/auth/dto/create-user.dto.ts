import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsArray,
  ArrayMinSize,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/modules/users/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: ['admin'] })
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Role, { each: true })
  roles: Role[];
}
