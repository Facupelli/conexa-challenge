import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { mockCreateUserDto, mockUserWithRole } from 'test/mocks/users.mock';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('validate user', () => {
    it('should return true for valid user', async () => {
      jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValueOnce(mockUserWithRole);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

      const result = await authService.validateUser(
        mockUserWithRole.email,
        mockUserWithRole.password,
      );

      expect(result).toEqual(mockUserWithRole);
    });

    it('should return Bad Request error if user not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(null);

      await expect(
        authService.validateUser(
          mockUserWithRole.email,
          mockUserWithRole.password,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return Bad Request error if passwords do not match', async () => {
      jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValueOnce(mockUserWithRole);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      await expect(
        authService.validateUser(
          mockUserWithRole.email,
          mockUserWithRole.password,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should validate user and return JWT token', async () => {
      const accessToken = 'access-token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);

      const result = await authService.login(mockUserWithRole);
      expect(result.access_token).toEqual(accessToken);
    });
  });

  describe('validate user', () => {
    it('should register a new user', async () => {
      const bcryptHashSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('hashedPassword');
      const loginSpy = jest
        .spyOn(authService, 'login')
        .mockResolvedValue({ access_token: 'mockAccessToken' });
      jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(null);
      jest.spyOn(usersService, 'createUser').mockResolvedValueOnce({
        ...mockUserWithRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await authService.register(mockCreateUserDto);

      expect(bcryptHashSpy).toHaveBeenCalledWith(
        mockCreateUserDto.password,
        10,
      );
      expect(usersService.createUser).toHaveBeenCalledWith({
        ...mockCreateUserDto,
        password: 'hashedPassword',
      });
      expect(loginSpy).toHaveBeenCalledWith(mockCreateUserDto); // Check if login was called with the DTO
      expect(result).toEqual({ access_token: 'mockAccessToken' });
    });

    it('should return Bad Request error if user already exists', async () => {
      jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValueOnce(mockUserWithRole);

      await expect(
        authService.validateUser(
          mockUserWithRole.email,
          mockUserWithRole.password,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
