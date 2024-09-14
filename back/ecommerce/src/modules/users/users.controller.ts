import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Res } from "@nestjs/common";
import { UsersService } from "./users.services";
import userDto from "src/dto/UseDto";
import IUser from "src/interfaces/user.interface";

@Controller('users')
export class UsersController{
    constructor(private readonly userService:UsersService){}

        @Get()
        getUsers(){
return this.userService.getUsers()
        }


    @Post()
    createUser(@Body() userData:userDto):Promise<IUser>{
        return this.userService.createUser(userData)
        }

    @Put()
    updateUser(){

    }

    @Delete()
    deleteUser(@Headers('tokne') token?:string){
        if(token==='123')
        return 'acceso a la ruta'
        return 'acceso denegado'
    }


    @Get(':id')
    getUserById(@Param('id') id:string){
            return this.userService.getUserById(Number(id))
    }

}