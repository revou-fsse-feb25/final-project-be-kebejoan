import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class TimesheetReportEntity {
  @ApiProperty({
    type: Number,
    description: 'Reporting user ID',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    type: Number,
    description: 'Project ID',
    example: 1,
  })
  projectId: number;

  @ApiProperty({
    type: Number,
    description: 'Phase ID',
    example: 2,
  })
  pjtPhaseId: number;

  @ApiProperty({
    type: String,
    format: 'date',
    description: 'Report date',
    example: '2099-08-14',
  })
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
  hoursPerDay: number;

  @ApiProperty({
    type: Number,
    description: 'Unique identifier of the timesheet report',
    example: 42,
  })
  id: number;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'When the report was created',
    example: '2099-08-14T10:00:00Z',
  })
  createdAt: Date;
}
