import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsString,
  IsDate,
  IsNumber,
  IsEnum,
  IsDateString,
} from 'class-validator';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Schema()
export class Transaction {
  @Prop()
  category: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  recipientOrSender: string;

  @Prop({ required: true })
  type: TransactionType;
}

export class CreateTransactionDto {
  category: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  amount: number;

  @IsString()
  recipientOrSender: string;

  @IsEnum(TransactionType)
  type: TransactionType;
}

export type TransactionDocument = Transaction & Document;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
