import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongoose } from '@typegoose/typegoose';
import { IsOptional } from 'class-validator';

@Schema()
export class Budget {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  maxSpend: number;

  @Prop({ required: true })
  themeColor: string;
}

export class updateBudgetDto {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget',
  })
  _id: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  maxSpend: number;

  @Prop({ required: true })
  themeColor: string;

  @Prop()
  @IsOptional()
  spent: number;

  @Prop()
  @IsOptional()
  remaining: number;
}

export class CreateBudgetDto {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  maxSpend: number;

  @Prop({ required: true })
  themeColor: string;
}

export type BudgetDocument = Budget & Document;

export const BudgetSchema = SchemaFactory.createForClass(Budget);
