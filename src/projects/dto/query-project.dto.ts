import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProjectQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pmId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  seId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  peId?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  pmCode?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  seCode?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  peCode?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  userCode?: string;

  @IsOptional()
  OR?: any[];

  @IsOptional()
  AND?: any[];
}
