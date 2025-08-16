import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { TokenItf } from './types/auth.service.interface';
import { UsersRepository } from 'src/users/users.repository';
import { comparePassword, hashPassword } from 'src/_common/utils/hashing';
import { AuthPayloadDto } from 'src/_common/res/auth-payload.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  private async generateToken(payloadDto: AuthPayloadDto): Promise<TokenItf> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payloadDto, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          '15m'
        ),
      }),
      this.jwtService.signAsync(payloadDto, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get(
          'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          '30d'
        ),
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async login(loginDto: LoginDto): Promise<TokenItf> {
    const { code, password } = loginDto;

    const foundUser = await this.usersRepository.findByCode(code);

    if (!foundUser) {
      throw new UnauthorizedException('code is not registered');
    }

    const isPasswordMatch = await comparePassword(
      password,
      foundUser.passwordHash
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const token = await this.generateToken({
      id: foundUser.id,
      code: foundUser.code,
      userRole: foundUser.userRole,
    });

    await this.usersRepository.update(foundUser.id, {
      lastLogin: new Date(),
      refreshToken: token.refresh_token,
    });

    return token;
  }

  // async register(registerDto: RegisterDto) {
  //   const { name, code, password } = registerDto;

  //   const foundUser = await this.usersRepository.findBycode(code);

  //   if (foundUser) {
  //     throw new ConflictException('code is already registered');
  //   }

  //   const hashedPassword = await hashPassword(password);

  //   const createdUser = await this.usersRepository.create({
  //     name,
  //     code,
  //     password: hashedPassword,
  //     role: Role.USER,
  //   });

  //   return createdUser;
  // }
}
