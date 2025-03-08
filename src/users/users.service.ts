import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/auth.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({
      username,
    });
  }
}
