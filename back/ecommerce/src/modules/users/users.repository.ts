import { Injectable } from '@nestjs/common';
import IUser from '../../interfaces/user.interface';

@Injectable()
export class UserRepository {
  private users:IUser[] = [
    {
      id: 1,
      name: 'user1',
      email: 'hola@gmail.com',
      password:'password1',
      address:'addres1',
      phone:'123',
      country:'argentina',
      city:'buenos aires'

    },
    {
    id: 2,
    name: 'user2',
    email: 'hola@gmail.com',
    password:'password1',
    address:'addres1',
    phone:'123',
    country:'argentina',
    city:'buenos aires'
    }
    ,{
      id: 3,
      name: 'user3',
      email: 'hola@gmail.com',
      password:'password1',
      address:'addres1',
      phone:'123',
      country:'argentina',
      city:'buenos aires'
    }
  ];

  async getUsers(){
    return this.users;
  }

  async getById(id:number){
return this.users.find((user)=>user.id===id)
  }

  async createUser(user){
    const id=this.users.length+1
    this.users=[...this.users,{id,...user}]
    return {id,...user}
  }
}
