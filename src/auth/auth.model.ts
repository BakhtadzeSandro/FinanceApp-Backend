import { IsEmail, IsNotEmpty } from 'class-validator';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, hide: true, hideJSON: true })
  password: string;

  @Prop({ required: true })
  income: number;

  @Prop({ required: true })
  expense: number;

  @Prop({ required: true })
  currentBalance: number;
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
