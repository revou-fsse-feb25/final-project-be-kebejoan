import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TimesheetReportEntity } from './entities/timesheet.entity';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TimesheetService } from './timesheet.service';
import { TimesheetReport, UserRole } from '@prisma/client';
import { ReportQueryDto } from 'src/reports/dto/query-report.dto';
import { RolesGuard } from 'src/_common/guards/role.guard';
import { JwtAuthGuard } from 'src/_common/guards/jwt-auth.guard';
import { Roles } from 'src/_common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('refresh_token')
@Controller('reports/timesheet')
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) {}

  @ApiOperation({ summary: 'Get many timesheet reports [PM ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many timesheet reports',
    type: TimesheetReportEntity,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as PM',
  })
  @Roles(UserRole.PM, UserRole.ADMIN)
  @Get('pm/:pmId')
  async findByPmId(@Param('pmId') pmId: number) {
    return await this.timesheetService.findByPmId(pmId);
  }

  @ApiOperation({ summary: 'Get many timesheet reports [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many timesheet reports',
    type: TimesheetReportEntity,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Roles(UserRole.ADMIN, UserRole.PM)
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
  @Roles(
    UserRole.ADMIN,
    UserRole.PM,
    UserRole.ENG_SE,
    UserRole.ENG_PE,
    UserRole.ENG_LEAD
  )
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.timesheetService.findOne(id);
  }
}
