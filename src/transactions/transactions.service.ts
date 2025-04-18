import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateTransactionDto,
  TableData,
  TransactionDocument,
  UpdateTransactionDto,
} from './transactions.model';
import { Model, SortOrder } from 'mongoose';

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

    const query: Record<string, any> = {
      userId,
    };

    if (search) {
      query.recipientOrSender = { $regex: search, $options: 'i' };
    }

    if (tableData.filter['category']) {
      query.category = { $regex: tableData.filter['category'], $options: 'i' };
    }

    const sortOption = tableData.sort.field
      ? { [tableData.sort.field]: tableData.sort.order }
      : { dateAdded: -1 };

    const items = await this.transactionModel
      .find(query)
      .skip(skip)
      .limit(tableData.paginator.limit)
      .sort(sortOption as Record<string, SortOrder>);

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

  async updateTransaction(
    id: string,
    userId: string,
    payload: UpdateTransactionDto,
  ) {
    const updated = await this.transactionModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: payload },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Transaction not found');
    return updated;
  }

  async deleteTransaction(id: string, userId: string) {
    const result = await this.transactionModel.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Transaction not found or not yours');
    }
  }
}
