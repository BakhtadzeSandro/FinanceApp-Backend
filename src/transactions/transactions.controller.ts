import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async editTransaction(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() payload: UpdateTransactionDto,
  ) {
    const userId = req['user']._id;
    return this.transactionsService.updateTransaction(id, userId, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteTransaction(@Req() req: Request, @Param('id') id: string) {
    const userId = req['user']._id;
    return this.transactionsService.deleteTransaction(id, userId);
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
