import { Controller, Get, Param, Query } from '@nestjs/common';
import { TimesheetReportEntity } from './entities/timesheet.entity';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TimesheetService } from './timesheet.service';
import { TimesheetReport } from '@prisma/client';
import { ReportQueryDto } from 'src/reports/dto/query-report.dto';

@Controller('reports/timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @ApiOperation({ summary: 'Get many timesheet reports [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many timesheet reports',
    type: TimesheetReportEntity,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Get()
  async findAll(@Query() query?: ReportQueryDto): Promise<TimesheetReport[]> {
    return await this.timesheetService.findAll(query);
  }

  @ApiOperation({ summary: 'Get one timesheet report [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find one timesheet report',
    type: TimesheetReportEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.timesheetService.findOne(id);
  }
}
