import { Prop } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @Prop()
  userInfo: userInfo;
}

export class userInfo {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  username: string;

  @IsEmail()
  @Prop()
  email: string;

  @Prop()
  avatar: string;
}

export class UpdatePasswordDto {
  @Prop()
  newPassword: string;
}
