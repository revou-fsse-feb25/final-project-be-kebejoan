import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { TokenItfExample } from './types/auth.service.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login User' })
  @ApiOkResponse({
    description: 'Success',
    isArray: false,
    example: TokenItfExample,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @ApiOperation({ summary: 'Register User' })
  // @ApiOkResponse({
  //   description: 'Success',
  //   isArray: false,
  //   example: TokenItfExample,
  // })
  // @Post('register')
  // async register(@Body() registerDto: RegisterDto) {
  //   return this.authService.register(registerDto);
  // }
}
