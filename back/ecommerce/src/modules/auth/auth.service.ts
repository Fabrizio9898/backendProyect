import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from 'src/dto/UseDto';

@Injectable()
export class AuthService {
 
  constructor(private readonly userRepository: UserRepository) {}
  

  signIn(userData: any) {
    return this.userRepository.signIn(userData)
  }

  signUp(user: CreateUserDto) {
    return this.userRepository.signUp(user);
  }
}
