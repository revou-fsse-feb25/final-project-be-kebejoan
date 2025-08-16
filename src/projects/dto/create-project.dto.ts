import { ApiProperty } from '@nestjs/swagger';
import { ExecutionStatus } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(8, {
    message: 'Project number must be at least 8 characters long',
  })
  @MaxLength(50, {
    message: 'Project number must be at most 50 characters long',
  })
  @ApiProperty({
    type: String,
    description: 'Project number of the project',
    example: 'PJT-1001',
  })
  pjtNo: string;

  @IsString()
  @MinLength(3, { message: 'Project name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Project name must be at most 50 characters long' })
  @ApiProperty({
    type: String,
    description: 'Project name of the project',
    example: 'Project Alpha',
  })
  pjtName: string;

  @IsString()
  @MinLength(3, { message: 'EPC name must be at least 3 characters long' })
  @MaxLength(50, { message: 'EPC name must be at most 50 characters long' })
  @ApiProperty({
    type: String,
    description: 'EPC name of the project',
    example: 'EPC Company A',
  })
  epcName: string;

  @IsString()
  @MinLength(3, { message: 'Owner name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Owner name must be at most 50 characters long' })
  @ApiProperty({
    type: String,
    description: 'Owner name of the project',
    example: 'Owner A',
  })
  ownerName: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Assigned PM ID of the project',
    example: 1,
  })
  assignedPMId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Assigned PE ID of the project',
    example: 1,
  })
  assignedPEId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Assigned SE ID of the project',
    example: 1,
  })
  assignedSEId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Current phase ID of the project',
    example: 1,
  })
  currentPhaseId: number;

  @IsEnum(ExecutionStatus, {
    message: 'Execution status must be one of ON_TRACK, LEADING, LAGGING',
  })
  @ApiProperty({
    enum: ExecutionStatus,
    description: 'Execution status of the project',
    example: ExecutionStatus.ONTRACK,
  })
  executionStatus: ExecutionStatus;

  @ApiProperty({ type: String, format: 'date', example: '2025-08-14' })
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  timeStart: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  timeEnd: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  phase1EndDate: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  phase2EndDate: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  phase3EndDate: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  phase4EndDate: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  phase5EndDate: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  phase6EndDate: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  phase7EndDate: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  phase8EndDate: Date;

  @ApiProperty({ type: String, format: 'date', example: '2099-08-14' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  phase9EndDate: Date;
}
