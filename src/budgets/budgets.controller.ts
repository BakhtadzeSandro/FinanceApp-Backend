import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './budgets.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('budgets')
export class BudgetsController {
  constructor(private budgetsService: BudgetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add-budget')
  addBudget(@Req() req: Request, @Body() createBudgetDto: CreateBudgetDto) {
    const userId = req['user']._id;
    return this.budgetsService.createBudget({
      ...createBudgetDto,
      userId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  getBudgets(@Req() req: Request) {
    return this.budgetsService.getBudgets(req['user']._id);
  }
}
