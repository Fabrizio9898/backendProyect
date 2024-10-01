import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.services';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDto } from 'src/dto/UseDto';
import { Request } from 'express';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/auth0/protected')
  getAuth0Protected(@Req() req: Request) {
    return JSON.stringify(req.oidc.user);
  }

  @Get()
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.Admin)
  @HttpCode(200)
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    const users = this.userService.getUsers(page, limit);
    return users;
  }

  @Put('changeAdmin/:id')
  changeAdmin(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.changeAdmin(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userData: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userData);
  }
}
