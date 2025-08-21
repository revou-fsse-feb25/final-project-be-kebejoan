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
    const accessTokenExpiration = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      '900s' // 15m in seconds as fallback
    );

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payloadDto, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: accessTokenExpiration,
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
      // return expiration in seconds (NextAuth expects this)
      expires_in:
        typeof accessTokenExpiration === 'string'
          ? parseInt(accessTokenExpiration)
          : accessTokenExpiration,
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

  async refreshToken(refreshToken: string): Promise<TokenItf> {
    try {
      // 1. Verify refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_SECRET'), // ⚠️ better to use a separate REFRESH_SECRET
      });

      // 2. Optional: check in DB if refresh token is still valid
      const user = await this.usersRepository.findOne(payload.sub);
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const accessTokenExpiration = this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        '900s' // 15m in seconds as fallback
      );

      // 3. Issue new tokens
      const [access_token, new_refresh_token] = await Promise.all([
        this.jwtService.signAsync(
          { sub: user.id, role: user.userRole },
          {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get(
              'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
              '15m'
            ),
          }
        ),
        this.jwtService.signAsync(
          { sub: user.id, role: user.userRole },
          {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get(
              'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
              '30d'
            ),
          }
        ),
      ]);

      // 4. Update DB with new refresh token (if you’re rotating)
      user.refreshToken = new_refresh_token;
      await this.usersRepository.update(user.id, user);

      // 5. Return response
      return {
        access_token,
        refresh_token: new_refresh_token,
        expires_in:
          typeof accessTokenExpiration === 'string'
            ? parseInt(accessTokenExpiration)
            : accessTokenExpiration,
      };
    } catch (e) {
      throw new UnauthorizedException('Refresh token invalid or expired');
    }
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
