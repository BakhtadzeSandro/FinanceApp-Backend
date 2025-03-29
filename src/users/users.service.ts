import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/auth.model';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto, UpdatePasswordDto } from './users.model';

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

  async checkPassword(username: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username });
    const passwordMatch = await bcrypt.compare(password, user?.password);
    return passwordMatch;
  }

  async updateUser(payload: UpdateUserDto | UpdatePasswordDto, userId: string) {
    if ('newPassword' in payload) {
      const newPassword = await bcrypt.hash(payload.newPassword, 10);
      await this.userModel.findByIdAndUpdate(userId, {
        password: newPassword,
      });
      return 'Password Updated Succesfully';
    } else {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(userId, { $set: payload.userInfo }, { new: true })
        .select('-password -__v');
      return updatedUser;
    }
  }
}
