import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserRepository } from 'src/modules/users/users.repository';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  const mockUserRepository: Partial<UserRepository> = {
    signIn: jest.fn().mockResolvedValue({
      access_token: 'mocked_access_token', // Devuelve un objeto de acceso simulado
    }),
    
    signUp: jest.fn().mockResolvedValue({   
      email: 'mocked_email@example.com',
      name: 'Mocked User',
    }),
  }; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: mockUserRepository, 
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('signIn', () => {
    it('should return an access token when valid credentials are provided', async () => {
      const userData = { email: 'mocked_email@example.com', password: 'mocked_password' };
      const result = await authService.signIn(userData);
      expect(result).toEqual({ access_token: 'mocked_access_token' });
    });

  
  });
});
