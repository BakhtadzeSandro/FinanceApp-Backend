import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';
import { BudgetsModule } from './budgets/budgets.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'finance-app',
    }),
    TransactionsModule,
    BudgetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
