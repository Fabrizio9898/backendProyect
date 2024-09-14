import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import userDto from "src/dto/UseDto";
import IUser from "src/interfaces/user.interface";

@Injectable()
export class UsersService{

    constructor(private userRepository:UserRepository){}

    getUsers(){
        return this.userRepository.getUsers()
    }

    getUserById(id:number){
        return this.userRepository.getById(id)
    }

    createUser(user:userDto):Promise<IUser>{
        return this.userRepository.createUser(user)
    }
}