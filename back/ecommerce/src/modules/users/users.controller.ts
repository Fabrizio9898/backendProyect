import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.services';
import userDto from 'src/dto/UseDto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
   async getUsers(@Query('page') page:number=1, @Query('limit') limit:number=5 ) {
    const users= await this.userService.getUsers(page,limit);
    return users;
  }


  // @Post()
  // @HttpCode(201)
  // async createUser(@Body() userData: userDto): Promise<number> {
  //   const userId=await this.userService.createUser(userData);
  //   return userId;
  // }

  // @Delete(':id')
  // @UseGuards(AuthGuard)

  // @HttpCode(200)
  // @UseGuards(AuthGuard)
  // async deleteUser(@Param('id') id: string) {
  //   const deletedUserid=await this.userService.deleteUser(Number(id))
  //   return deletedUserid;
  // }

  @Get(':id')
  @UseGuards(AuthGuard)

  @HttpCode(200)
  async getUserById(@Param('id') id: string) {
    const user=await this.userService.getUserById(id);
    return user;
  }

  // @Put(':id')
  // @UseGuards(AuthGuard)

  // @HttpCode(200)
  // async updateUser(@Param('id') id:string,@Body() userData:userDto) {
  //   const updatedUserId=await this.userService.updateUser(Number(id),userData)
  //   return updatedUserId;
  // }

}
