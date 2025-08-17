import { Injectable } from '@nestjs/common';
import { TimesheetRepository } from './timesheet.repository';

@Injectable()
export class TimesheetService {
  constructor(private readonly progressRepository: TimesheetRepository) {}
}
