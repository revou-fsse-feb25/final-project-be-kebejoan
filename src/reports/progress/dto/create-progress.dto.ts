import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProgressDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Reporting user ID',
    example: 1,
  })
  userId: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Project ID',
    example: 1,
  })
  projectId: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Phase ID',
    example: 1,
  })
  pjtPhaseId: number;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  reportDate: Date;

  @IsString()
  @MinLength(3, { message: 'Task must be at least 3 characters long' })
  @MaxLength(250, { message: 'Task must be at most 250 characters long' })
  @ApiProperty({
    type: String,
    description: 'Task done this week',
    example: 'Create controller',
  })
  thisWeekTask: string;

  @IsString()
  @MinLength(3, { message: 'Issue must be at least 3 characters long' })
  @MaxLength(250, { message: 'Issue must be at most 250 characters long' })
  @ApiProperty({
    type: String,
    description: 'Issue this week',
    example: 'Server crashes',
  })
  thisWeekIssue: string;

  @IsString()
  @MinLength(3, { message: 'Task must be at least 3 characters long' })
  @MaxLength(250, { message: 'Task must be at most 250 characters long' })
  @ApiProperty({
    type: String,
    description: 'Task for next week',
    example: 'Create endpoints',
  })
  nextWeekTask: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Advance phase of the project?',
    example: true,
  })
  advancePhase: boolean;
}
