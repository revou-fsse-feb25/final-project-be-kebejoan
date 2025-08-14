import { ApiProperty } from '@nestjs/swagger';
import { Department, UserRole } from '@prisma/client';
import { Exclude, Transform, Type } from 'class-transformer';

export class UserEntity {
  @ApiProperty({
    type: Number,
    description: 'The id of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The code of the user',
    example: 'JDO',
  })
  code: string;

  @ApiProperty({
    enum: UserRole,
    description: 'The role of the user',
    example: UserRole.ENG_SE,
  })
  userRole: UserRole;

  @ApiProperty({
    enum: Department,
    description: 'The department of the user',
    example: Department.Delivery,
  })
  dept: Department;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2025-08-14',
    description: 'The join date of the user',
  })
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  joinAt: Date;

  @ApiProperty({
    type: Boolean,
    description: 'The resignation status of the user',
    example: true,
  })
  isResigned: boolean | null;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2025-08-14',
    description: 'The resignation date of the user',
  })
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  resignedAt?: Date | null;

  @ApiProperty({
    type: Date,
    description: 'The created date of the user',
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'The updated date of the user',
    example: new Date(),
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    description: 'The deleted date of the user',
    example: new Date(),
  })
  lastLogin?: Date | null;

  @Exclude()
  passwordHash: string;

  @Exclude()
  tokens?: string | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
