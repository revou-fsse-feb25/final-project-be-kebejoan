import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: Boolean,
    example: true,
    required: false,
    description: 'Set to true if project is finished',
  })
  isFinished: boolean;
}
