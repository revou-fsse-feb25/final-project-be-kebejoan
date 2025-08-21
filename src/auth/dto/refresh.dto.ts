import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class refreshTokenDto {
  @IsString({ message: 'Please enter a valid refresh token' })
  @IsNotEmpty({ message: 'Refresh token is required' })
  @ApiProperty({
    type: String,
    description: 'Refresh token',
    example: 'refresh_token',
  })
  refresh_token: string;
}
