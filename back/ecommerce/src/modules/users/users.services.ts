import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UpdateUserDto } from 'src/dto/UpdateUserDto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  
  
  
  
  changeAdmin(id:string) {
    return this.userRepository.changeAdmin(id)
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

  

  updateUser(id: string, userData: UpdateUserDto) {
    return this.userRepository.updateUser(id, userData);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
