import {  Injectable,  } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from 'src/dto/UseDto';
import { LoginUserDto } from 'src/dto/LoginUserDto';

@Injectable()
export class AuthService {
 
  constructor(private readonly userRepository: UserRepository) {}
  

  signIn(userData: LoginUserDto) {
    return this.userRepository.signIn(userData)
  }

  signUp(user: CreateUserDto) {
    return this.userRepository.signUp(user);
  }
}
