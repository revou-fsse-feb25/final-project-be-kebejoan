import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTimesheetDto } from './create-timesheet.dto';

export class UpdateTimesheetDto extends PartialType(
  OmitType(CreateTimesheetDto, [
    'userId',
    'projectId',
    'pjtPhaseId',
    'reportDate',
  ] as const)
) {}
