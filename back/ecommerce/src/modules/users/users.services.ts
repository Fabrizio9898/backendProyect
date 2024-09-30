import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from 'src/dto/UseDto';
import { LoginUserDto } from 'src/dto/LoginUserDto';

@Injectable()
export class UsersService {
 
  constructor(private userRepository: UserRepository) {}



  signIn(userData: LoginUserDto) {
    return this.userRepository.signIn(userData)
  }

  getUsers(page: number, limit: number) {
    return this.userRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  createUser(user: CreateUserDto) {
    return this.userRepository.createUser(user);
  }

  updateUser(id: string, userData: UpdateUserDto) {
    return this.userRepository.updateUser(id, userData);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
