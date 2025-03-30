import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdatePasswordDto, UpdateUserDto } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Req() req: Request) {
    return this.usersService.findOne(req['user'].username, false);
  }

  @Post('check-password')
  @UseGuards(AuthGuard('jwt'))
  checkPassword(@Req() req: Request, @Body() payload: { password: string }) {
    return this.usersService.checkPassword(
      req['user'].username,
      payload.password,
    );
  }

  @Patch(':id')
  updateUser(
    @Param() userId: { id: string },
    @Body() payload: UpdateUserDto | UpdatePasswordDto,
  ) {
    return this.usersService.updateUser(payload, userId.id);
  }

  @Get('check-user')
  checkIfUserExists(
    @Query('field') field: string,
    @Query('value') value: string,
  ) {
    return this.usersService.checkIfUserExists(field, value);
  }
}
