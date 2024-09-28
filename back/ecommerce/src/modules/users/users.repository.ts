import { Injectable, Query } from '@nestjs/common';
import IUser from '../../interfaces/user.interface';
import userDto from 'src/dto/UseDto';

@Injectable()
export class UserRepository {
  private users: IUser[] = [
    {
      id: '1',
      name: 'user1',
      email: 'hola@gmail.com',
      password: 'password1',
      address: 'addres1',
      phone: '123',
      country: 'argentina',
      city: 'buenos aires',
    },
    {
      id: '2',
      name: 'user2',
      email: 'hola@gmail.com',
      password: 'password1',
      address: 'addres1',
      phone: '123',
      country: 'argentina',
      city: 'buenos aires',
    },
    {
      id: '3',
      name: 'user3',
      email: 'hola@gmail.com',
      password: 'password1',
      address: 'addres1',
      phone: '123',
      country: 'argentina',
      city: 'buenos aires',
    },
  ];
  public omitPassword(user: IUser): Omit<IUser, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<IUser, 'password'>[]> {
    const start = (page - 1) * limit;
    const end = start + limit;
    const usersPagination = this.users.slice(start, end);

    return usersPagination.map(this.omitPassword);
  }

  // async getById(id: number): Promise<Omit<IUser, 'password'> | undefined> {
  //   const user = this.users.find((user) => user.id === id);
  //   return user ? this.omitPassword(user) : undefined;
  // }

  // async createUser(user: userDto): Promise<number> {
  //   const id = this.users.length + 1;
  //   const newUser = { id, ...user };
  //   this.users.push(newUser);
  //   return id;
  // }

  // async updateUser(
  //   id: number,
  //   updatedUser: Partial<Omit<IUser, 'id'>>,
  // ): Promise<number | string> {
  //   const index = this.users.findIndex((user) => user.id === id);
  //   if (index === -1) return 'user not found';

  //   this.users[index] = { ...this.users[index], ...updatedUser };
  //   return id;
  // }

  // async deleteUser(id: number): Promise<number> {
  //   const index = this.users.findIndex((user) => user.id === id);
  //   if (index === -1) return undefined;

  //   this.users.splice(index, 1);
  //   return id;
  // }

   async findUserByEmail(email: string) {
         const user = this.users.find(user => user.email === email);
         return user;
   }
}
