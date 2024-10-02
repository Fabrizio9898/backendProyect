import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from 'src/dto/UseDto';
import { BadRequestException, HttpException } from '@nestjs/common';
import { AuthService } from '../src/modules/auth/auth.service';
import { UserRepository } from '../src/modules/users/users.repository';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  const mockUserRepository = {
    signIn: jest.fn(),
    signUp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should successfully sign in a user', async () => {
      const userData = { email: 'test@example.com', password: 'ValidPassword123!' };
      const expectedToken = { access_token: 'token' };
      
      mockUserRepository.signIn.mockResolvedValue(expectedToken);

      const result = await authService.signIn(userData);
      expect(result).toEqual(expectedToken);
      expect(mockUserRepository.signIn).toHaveBeenCalledWith(userData);
    });

    it('should throw BadRequestException if credentials are invalid', async () => {
      const userData = { email: 'invalid@example.com', password: 'InvalidPassword' };
      
      mockUserRepository.signIn.mockRejectedValue(new BadRequestException('Credenciales inválidas'));

      await expect(authService.signIn(userData)).rejects.toThrow(BadRequestException);
    });
  });

  describe('signUp', () => {
    it('should successfully sign up a user', async () => {
      const newUser: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'ValidPassword123!',
        phone: 1234567890,
        country: 'Country',
        address: 'Address',
        city: 'City',
        isAdmin: false,
      };

      const createdUser = { ...newUser, password: undefined }; // Omitir la contraseña

      mockUserRepository.signUp.mockResolvedValue(createdUser);

      const result = await authService.signUp(newUser);
      expect(result).toEqual(createdUser);
      expect(mockUserRepository.signUp).toHaveBeenCalledWith(newUser);
    });

    it('should throw HttpException if email is already in use', async () => {
      const newUser: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'ValidPassword123!',
        phone: 1234567890,
        country: 'Country',
        address: 'Address',
        city: 'City',
        isAdmin: false,
      };

      mockUserRepository.signUp.mockRejectedValue(new HttpException('Email en uso', 409));

      await expect(authService.signUp(newUser)).rejects.toThrow(HttpException);
    });
  });
});
