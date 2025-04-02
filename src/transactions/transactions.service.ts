import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateTransactionDto,
  TransactionDocument,
} from './transactions.model';
import { Model } from 'mongoose';

@Injectable()
export class TransactionsService {
  defaultPage = 1;
  defaultLimit = 10;
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    searchKey: string,
    category: string,
  ) {
    const skip = (page - 1) * limit;

    const search = searchKey?.trim();

    let query: Record<string, unknown> = search
      ? {
          recipientOrSender: { $regex: search, $options: 'i' },
        }
      : {};

    if (category) {
      query = {
        ...query,
        category: {
          $regex: category,
        },
      };
    }

    const items = await this.transactionModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });
    const totalCount = await this.transactionModel.countDocuments(query);
    return {
      data: items,
      paginator: {
        page: 1,
        limit: limit,
        totalCount,
      },
    };
  }

  async createTransaction(payload: CreateTransactionDto) {
    await this.transactionModel.create(payload);
    return await this.transactionModel.find({
      skip: (this.defaultPage - 1) * 10,
      take: this.defaultLimit,
    });
  }
}
