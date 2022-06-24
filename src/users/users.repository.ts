import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from './inputs/create-user.input';
import { FindUserInput } from './inputs/find-user.input';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async saveUser(input: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel({ ...input });
    return await createdUser.save();
  }

  async findUser(input: FindUserInput): Promise<User> {
    return await this.userModel.findOne({ ...input });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findUserById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async updateUser(input: CreateUserInput): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { email: input.email },
      { ...input },
      { new: true },
    );
  }
}
