import { ApiProperty } from '@nestjs/swagger';
import { ExecutionStatus } from '@prisma/client';

export class ProjectEntity {
  @ApiProperty({ type: String, example: 'PJT-1001' })
  pjtNo: string;

  @ApiProperty({ type: String, example: 'Project Alpha' })
  pjtName: string;

  @ApiProperty({ type: String, example: 'EPC Company A' })
  epcName: string;

  @ApiProperty({ type: String, example: 'Owner A' })
  ownerName: string;

  @ApiProperty({ type: Number, example: 1, required: false })
  assignedPMId?: number;

  @ApiProperty({ type: Number, example: 1, required: false })
  assignedPEId?: number;

  @ApiProperty({ type: Number, example: 1, required: false })
  assignedSEId?: number;

  @ApiProperty({ type: Number, example: 1, required: false })
  currentPhaseId?: number;

  @ApiProperty({
    enum: ExecutionStatus,
    example: ExecutionStatus.ONTRACK,
  })
  executionStatus: ExecutionStatus;

  @ApiProperty({ type: String, format: 'date', example: '2025-08-14' })
  timeStart: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  timeEnd: Date;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2099-08-14',
    required: false,
  })
  phase1EndDate?: Date;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2099-08-14',
    required: false,
  })
  phase2EndDate?: Date;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2099-08-14',
    required: false,
  })
  phase3EndDate?: Date;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2099-08-14',
    required: false,
  })
  phase4EndDate?: Date;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2099-08-14',
    required: false,
  })
  phase5EndDate?: Date;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2099-08-14',
    required: false,
  })
  phase6EndDate?: Date;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2099-08-14',
    required: false,
  })
  phase7EndDate?: Date;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2099-08-14',
    required: false,
  })
  phase8EndDate?: Date;

  @ApiProperty({
    type: String,
    format: 'date',
    example: '2099-08-14',
    required: false,
  })
  phase9EndDate?: Date;

  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
    description: 'Set to true if project is finished',
  })
  isFinished?: boolean;
}
