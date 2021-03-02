import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPartial } from './entities/user-partial.entity';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const userArray = await this.userRepository.find();
    console.log(userArray);
    if (userArray.length == 0) {
      const msg = `User does not exist`;
      console.error(msg);
      throw new NotFoundException(msg);
    }
    return userArray;
  }
  async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ userId: userId });
    if (user == null) {
      const msg = `User with ID ${userId} not found`;
      console.error(msg);
      throw new NotFoundException(msg);
    }
    return user;
  }

  async addUser(userDto: CreateUserDto): Promise<User> {
    const _user = await this.userRepository.findOne({ userId: userDto.userId });
    if (_user != null) {
      const msg = `User with ID ${userDto.userId} already exists`;
      console.error(msg);
      throw new NotAcceptableException(msg);
    }
    const user = this.dtoToEntity(userDto);
    return await this.userRepository.save(user);
  }

  async update(userId: string, userDto: UpdateUserDto): Promise<User> {
    await this.getUser(userId);
    await this.userRepository.update({ userId: userId }, userDto);
    return await this.getUser(userId);
  }

  async delete(userId: string): Promise<string> {
    await this.getUser(userId);
    await this.userRepository.delete({ userId: userId });
    return 'Deleted';
  }

  dtoToEntity(userDto: CreateUserDto): User {
    const user = new User();
    user.userId = userDto.userId;
    user.name = userDto.name;
    user.password = userDto.password;
    user.phone = userDto.phone;
    user.email = userDto.email;
    return user;
  }
  updateEntity(user: User, userDto: UpdateUserDto): UserPartial {
    return user;
  }
}
