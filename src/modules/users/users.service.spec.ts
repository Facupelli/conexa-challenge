import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import {
  mockCreateUserDto,
  mockUser,
  mockUserWithRole,
} from 'test/mocks/users.mock';
import { NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';

describe('AuthService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findUnique: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get(UsersRepository);
  });

  describe('find by email', () => {
    it('should return a user if email exists', async () => {
      jest
        .spyOn(usersRepository, 'findUnique')
        .mockResolvedValueOnce(mockUserWithRole);

      const result = await usersService.findByEmail(mockUserWithRole.email);

      expect(result).toEqual(mockUserWithRole);
    });

    it('should throw NotFound error if email does not exist', async () => {
      jest.spyOn(usersRepository, 'findUnique').mockResolvedValueOnce(null);

      await expect(
        usersService.findByEmail(mockUserWithRole.email),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create user', () => {
    it('should create a new user', async () => {
      jest.spyOn(usersRepository, 'createUser').mockResolvedValueOnce(mockUser);

      const result = await usersService.createUser(mockCreateUserDto);
      expect(result).toEqual(mockUser);
    });
  });
});
