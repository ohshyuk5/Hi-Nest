import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }
  @Get(':id')
  getUserById(@Param('id') userId: string): Promise<User> {
    return this.userService.getUser(userId);
  }
  @Post()
  addUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.addUser(userData);
  }
  @Patch(':id')
  updateUser(
    @Param('id') userId: string,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(userId, userData);
  }
  @Delete(':id')
  deleteUserById(@Param('id') userId: string): Promise<string> {
    return this.userService.delete(userId);
  }
}
