import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { CreateUserDto, UpdateUserDto } from "src/dto/UseDto";

@Injectable()
export class UsersService{

    constructor(
        private userRepository:UserRepository){}

         getUsers(page: number, limit: number) {
           this.userRepository.getUsers(page,limit)
        }



     getUserById(id:string){
       return this.userRepository.getUserById(id)
    }

    findUserByEmail(email:string){
        return this.userRepository.findUserByEmail(email)
    }

     createUser(user:CreateUserDto){
        return this.userRepository.createUser(user)
    }

     updateUser(id:string,userData:UpdateUserDto){
       return this.userRepository.updateUser(id,userData)
    }

     deleteUser(id:string){
       return this.userRepository.deleteUser(id)
    }

}