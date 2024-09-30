import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.services';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDto } from 'src/dto/UseDto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
    getUsers(@Query('page') page:number=1, @Query('limit') limit:number=5 ) {
    const users=  this.userService.getUsers(page,limit);
    return users;
  }


  @Post()
  @HttpCode(201)
   createUser(@Body() userData: UpdateUserDto) {
   return this.userService.createUser(userData)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)

  @HttpCode(200)
  @UseGuards(AuthGuard)
   deleteUser(@Param('id',ParseUUIDPipe) id: string) {
   return this.userService.deleteUser(id)
  }

  @Get(':id')
  @UseGuards(AuthGuard)

  @HttpCode(200)
   getUserById(@Param('id',ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)

  @HttpCode(200)
   updateUser(@Param('id',ParseUUIDPipe) id:string,@Body() userData:UpdateUserDto) {
  return this.userService.updateUser(id,userData)
  }

}
