import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateTransactionDto,
  TableData,
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

  async findAll(userId: string, tableData: TableData) {
    const skip = (tableData.paginator.page - 1) * tableData.paginator.limit;

    const search = tableData.searchKey?.trim();

    let query: Record<string, any> = {
      userId,
    };

    if (search) {
      query.recipientOrSender = { $regex: search, $options: 'i' };
    }

    if (tableData.filter['category']) {
      query.category = { $regex: tableData.filter['category'], $options: 'i' };
    }

    const items = await this.transactionModel
      .find(query)
      .skip(skip)
      .limit(tableData.paginator.limit)
      .sort({ dateAdded: -1 });
    const totalCount = await this.transactionModel.countDocuments(query);
    return {
      data: items,
      paginator: {
        page: tableData.paginator.page,
        limit: tableData.paginator.limit,
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
