import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongoose } from '@typegoose/typegoose';
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
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  })
  _id: string;

  @Prop()
  category: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  dateAdded: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  recipientOrSender: string;

  @Prop({ required: true })
  type: TransactionType;
}

export class CreateTransactionDto {
  category: string;

  userId: string;

  @IsDateString()
  date: Date;

  @IsDateString()
  dateAdded: Date;

  @IsNumber()
  amount: number;

  @IsString()
  recipientOrSender: string;

  @IsEnum(TransactionType)
  type: TransactionType;
}

export class TableData {
  paginator: Paginator;
  filter: Record<string, string>;
  searchKey: string;
  sort: {
    field: string;
    order: 1 | -1;
  };
}

export class Paginator {
  page: number;
  limit: number;
}

export type TransactionDocument = Transaction & Document;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
