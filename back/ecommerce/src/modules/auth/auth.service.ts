import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async getAuth() {
    return `get auth`;
  }

  async signIn(email: string, pass: string) {
    if (!email || !pass) {
      throw new HttpException(
        'Email o password incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.userRepository.findUserByEmail(email);
    if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const {password, ...result } = user;
      
      return result;
  }
}
