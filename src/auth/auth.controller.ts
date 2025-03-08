import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './auth.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerDto: User) {
    return this.authService.registerUser(registerDto);
  }

  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
