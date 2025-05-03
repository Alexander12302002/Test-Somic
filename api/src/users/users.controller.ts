import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto)
      return { message: 'User successfully created', user }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return { message: 'All Users registered', users }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Get(':cc')
  async findOne(@Param('cc') cc: string) {
    try {
      const user = await this.usersService.findOne(cc);
      return { message: 'User found', user }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return { message: 'updated user', user }
    } catch (error) {
      return { message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(id);
      return { message: 'deleted user' }
    } catch (error) {
      return { message: error.message };
    }
  }
}
