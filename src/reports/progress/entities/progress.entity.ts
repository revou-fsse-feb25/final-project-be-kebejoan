import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class ProgressReportEntity {
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
    example: 1,
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
    type: String,
    description: 'Task done this week',
    example: 'Create controller',
  })
  thisWeekTask: string;

  @ApiProperty({
    type: String,
    description: 'Issue this week',
    example: 'Server crashes',
  })
  thisWeekIssue: string;

  @ApiProperty({
    type: String,
    description: 'Task for next week',
    example: 'Create endpoints',
  })
  nextWeekTask: string;

  @ApiProperty({
    type: Boolean,
    description: 'Advance phase of the project?',
    example: true,
  })
  advancePhase: boolean;

  @ApiProperty({
    type: Number,
    description: 'Unique identifier of the progress report',
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
