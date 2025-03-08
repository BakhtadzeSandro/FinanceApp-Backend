import { IsEmail, IsNotEmpty } from 'class-validator';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({})
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export class CreateUserDto {
  @Prop({ required: true, unique: true, lowercase: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @IsNotEmpty()
  @Prop({ required: true })
  username: string;

  @IsEmail()
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
