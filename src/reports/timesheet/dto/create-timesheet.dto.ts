import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber, IsPositive } from 'class-validator';

export class CreateTimesheetDto {
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
    example: 2,
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

  @ApiProperty({
    type: Number,
    description: 'Hours worked in a day (max 2 decimals)',
    example: 7.5,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Hours must have at most 2 decimal places' }
  )
  @IsPositive({ message: 'Hours must be greater than 0' })
  hoursPerDay: number;
}
