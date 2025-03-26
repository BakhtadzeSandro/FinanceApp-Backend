import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, User, UserDocument } from './auth.model';
import { UsersService } from 'src/users/users.service';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      currentBalance: 0,
      income: 0,
      expense: 0,
    });
    return user.save();
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<Record<string, string>> {
    const user = await this.usersService.findOne(username, true);
    const isPasswordCorrect = await bcrypt.compare(pass, user?.password);
    if (user?.username !== username || !isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect username or password');
    } else {
      const payload = { username: user.username, sub: user._id };
      const token = this.jwtService.sign(payload);

      return { access_token: token };
    }
  }
}
