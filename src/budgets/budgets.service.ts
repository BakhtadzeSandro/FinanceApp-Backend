import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BudgetDocument, CreateBudgetDto } from './budgets.model';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel('Budget')
    private budgetModel: Model<BudgetDocument>,
  ) {}

  async createBudget(payload: CreateBudgetDto) {
    return await this.budgetModel.create(payload);
  }

  async getBudgets(userId: ObjectId) {
    return await this.budgetModel.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: 'transactions',
          let: { category: '$category', userId: '$userId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$category', '$$category'] },
                    { $eq: ['$userId', '$$userId'] },
                  ],
                },
              },
            },
            { $sort: { dateAdded: -1 } },
            { $limit: 3 },
          ],
          as: 'transactions',
        },
      },
    ]);
  }
}
