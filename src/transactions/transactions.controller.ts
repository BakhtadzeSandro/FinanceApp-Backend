import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from './transactions.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add-transaction')
  addTransaction(
    @Req() req: Request,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const userId = req['user']._id;
    return this.transactionsService.createTransaction({
      ...createTransactionDto,
      userId,
    });
  }

  @Patch(':id')
  editTransaction(@Body() payload: UpdateTransactionDto) {
    return this.transactionsService.updateTransaction(payload);
  }

  @Delete(':id')
  deleteTransaction(@Body() transactionId: string) {
    return this.transactionsService.deleteTransaction(transactionId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  getTransactionsList(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('filter') filter: string,
    @Query('sort') sort: string,
  ) {
    const userId = req['user']._id;
    return this.transactionsService.findAll(userId, {
      paginator: {
        page,
        limit,
      },
      filter: JSON.parse(filter),
      searchKey: search,
      sort: JSON.parse(sort),
    });
  }
}
