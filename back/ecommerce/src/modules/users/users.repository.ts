import { Injectable, Query } from '@nestjs/common';
import IUser from '../../interfaces/user.interface';
import  { CreateUserDto, UpdateUserDto } from 'src/dto/UseDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public omitPassword(user: IUser): Omit<IUser, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'password'>[]> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return users.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) return `user not found`;
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }


  async createUser(user: CreateUserDto) {
    const newUser=await this.userRepository.save(user)
    const{password,...userNoPassword}=user;
    return userNoPassword
  }

  async updateUser(
    id: string,
    user: UpdateUserDto,
  ): Promise<Partial<User>>{
   await this.userRepository.update(id,user)
   const updatedUser=await this.userRepository.findOneBy({id})
   const{password,...userNoPassword}=updatedUser
   return userNoPassword
  }

  async deleteUser(id: string): Promise<Partial<User>> {
    const user=await this.userRepository.findOneBy({id})
    this.userRepository.remove(user)
    const {password,...userNoPassword}=user
    return userNoPassword;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
