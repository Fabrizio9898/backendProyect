import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import userDto from "src/dto/UseDto";
import IUser from "src/interfaces/user.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>){}

        async getUsers(page: number, limit: number): Promise<Omit<User, 'password'>[]> {
            const [users, total] = await this.userRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });
    
            return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
        }
    async getUserById(id:string){
        const user=await this.userRepository.findOneBy({id})
        return user;
    }

    // async createUser(user:userDto):Promise<number>{
    //     const createdUserId = await this.userRepository.createUser(user);
    //     return createdUserId;
    // }

    // async updateUser(id:number,userData:userDto){
    //     const updatedUserId=await this.userRepository.updateUser(id,userData)
    //     return updatedUserId
    // }

    // async deleteUser(id:number){
    //     const deletedUserId=await this.userRepository.deleteUser(id)
    //     return deletedUserId
    // }

}