import { ApiProperty } from '@nestjs/swagger';
import { UserRole, Department } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long' })
  @ApiProperty({
    type: String,
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @Length(3, 3, { message: 'Code must be exactly 3 characters long' })
  @ApiProperty({
    type: String,
    description: 'The code of the user',
    example: 'JDO',
  })
  code: string;

  @IsEnum(UserRole, {
    message: 'User role must be one of ENG_PE, ENG_SE, ENG_LEAD, PM, ADMIN',
  })
  @ApiProperty({
    enum: UserRole,
    description: 'The role of the user',
    example: UserRole.ENG_SE,
  })
  userRole: UserRole;

  @IsString()
  @MinLength(3, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password must be at most 50 characters long' })
  @ApiProperty({
    type: String,
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;

  @IsEnum(Department, {
    message: 'Department must be one of ENG, SE, PM, ADMIN',
  })
  @ApiProperty({
    enum: Department,
    description: 'The department of the user',
    example: Department.Delivery,
  })
  dept: Department;

  @ApiProperty({ type: String, format: 'date', example: '2025-08-14' })
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  joinAt: Date;
}
