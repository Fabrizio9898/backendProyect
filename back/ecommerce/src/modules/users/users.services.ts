import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import userDto from "src/dto/UseDto";
import IUser from "src/interfaces/user.interface";

@Injectable()
export class UsersService{

    constructor(private userRepository:UserRepository){}

    async getUsers(page:number,limit:number){
        const users=await this.userRepository.getUsers(page,limit)
        return users;
    }

    async getUserById(id:number){
        const user=await this.userRepository.getById(id)
        return user;
    }

    async createUser(user:userDto):Promise<number>{
        const createdUserId = await this.userRepository.createUser(user);
        return createdUserId;
    }

    async updateUser(id:number,userData:userDto){
        const updatedUserId=await this.userRepository.updateUser(id,userData)
        return updatedUserId
    }

    async deleteUser(id:number){
        const deletedUserId=await this.userRepository.deleteUser(id)
        return deletedUserId
    }

}