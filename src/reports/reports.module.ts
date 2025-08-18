import { Module } from '@nestjs/common';
import { ProgressController } from './progress/progress.controller';
import { TimesheetController } from './timesheet/timesheet.controller';
import { ProgressService } from './progress/progress.service';
import { ProgressRepository } from './progress/progress.repository';
import { TimesheetRepository } from './timesheet/timesheet.repository';
import { TimesheetService } from './timesheet/timesheet.service';

@Module({
  controllers: [ProgressController, TimesheetController],
  providers: [
    ProgressService,
    TimesheetService,
    ProgressRepository,
    TimesheetRepository,
  ],
  exports: [
    ProgressService,
    TimesheetService,
    ProgressRepository,
    TimesheetRepository,
  ],
})
export class ReportsModule {}
