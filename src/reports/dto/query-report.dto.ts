import { IsOptional, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ReportQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  projectId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pjtPhaseId?: number;

  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const d = new Date(value);
    d.setUTCHours(0, 0, 0, 0); // normalize to start of UTC day
    return d;
  })
  reportDate?: Date;

  @IsOptional()
  OR?: any[];
}
