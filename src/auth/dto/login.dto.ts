import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Please enter a valid user code' })
  @IsNotEmpty({ message: 'User code is required' })
  @Length(3, 3, { message: 'User code must be 3 characters' })
  @ApiProperty({
    type: String,
    description: 'User Code',
    example: 'JDO',
  })
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  @MaxLength(255, { message: 'Password cannot be longer than 255 characters' })
  @ApiProperty({
    type: String,
    description: 'Password',
    example: 'Password123',
  })
  password: string;
}
