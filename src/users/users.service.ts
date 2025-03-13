import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/auth.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(
    username: string,
    isLogin: boolean,
  ): Promise<UserDocument | null> {
    return isLogin
      ? this.userModel.findOne({
          username,
        })
      : this.userModel
          .findOne({
            username,
          })
          .select('-password -__v');
  }
}
