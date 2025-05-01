import { ObjectId } from 'mongodb';
import { Model, Types } from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';


@Injectable()
export class UsersService {
  constructor(@InjectModel('users', 'db1') private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { User_email, User_Nit, User_CC } = createUserDto;
    const existingUserEmail = await this.userModel.findOne({ User_email });
    const existingUserNit = await this.userModel.findOne({ User_Nit });
    const existingUserCC = await this.userModel.findOne({ User_CC });

    if (existingUserEmail || existingUserNit || existingUserCC) {
      throw new ConflictException('The email, Nit or CC already exists');
    }

    const newUser = new this.userModel(createUserDto)
    return newUser.save();
  }

  async findAll() {
    const AllUsers = await this.userModel.find();
    if (!AllUsers) {
      throw new ConflictException('dont exist users');
    }
    return AllUsers
  }

  async findOne(id: string): Promise<User> {
    const objectId = new ObjectId(id);
    const User = await this.userModel.findOne({ _id: objectId });
    if (!User) {
      throw new ConflictException('dont exist the user');
    }
    return User
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const objectId = new ObjectId(id);
    const user = await this.userModel.findById(objectId);
    if (!user) {
      throw new ConflictException('User not found');
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(objectId, updateUserDto, { new: true })
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async remove(id: string) {
    const objectId = new ObjectId(id);
    const user = await this.userModel.findOneAndDelete({ _id: objectId })
    if (!user) {
      throw new NotFoundException('User not found');
    }

  }
}
