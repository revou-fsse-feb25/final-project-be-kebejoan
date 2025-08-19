import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ProgressReportEntity } from './entities/progress.entity';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProgressService } from './progress.service';
import { ProgressReport, UserRole } from '@prisma/client';
import { ReportQueryDto } from 'src/reports/dto/query-report.dto';
import { JwtAuthGuard } from 'src/_common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/_common/guards/role.guard';
import { Roles } from 'src/_common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @ApiOperation({ summary: 'Get many timesheet reports [PM ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many timesheet reports',
    type: ProgressReportEntity,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as PM',
  })
  @Roles(UserRole.PM, UserRole.ADMIN)
  @Get('pm/:pmId')
  async findByPmId(@Param('pmId') pmId: number) {
    return await this.progressService.findByPmId(pmId);
  }

  @ApiOperation({ summary: 'Get many progress reports [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many progress reports',
    type: ProgressReportEntity,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Roles(UserRole.ADMIN, UserRole.PM)
  @Get()
  async findAll(@Query() query?: ReportQueryDto): Promise<ProgressReport[]> {
    return await this.progressService.findAll(query);
  }

  @ApiOperation({ summary: 'Get one progress report [ADMIN ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find one progress report',
    type: ProgressReportEntity,
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
    return await this.progressService.findOne(id);
  }
}
