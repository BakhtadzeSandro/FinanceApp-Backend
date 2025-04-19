import { Module } from '@nestjs/common';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { BudgetSchema } from './budgets.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Budget', schema: BudgetSchema }]),
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
})
export class BudgetsModule {}
