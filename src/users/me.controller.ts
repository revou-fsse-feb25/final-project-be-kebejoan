import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/_common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/_common/guards/role.guard';
import { UsersMeService } from './me.service';
import { CurrentUser } from 'src/_common/decorators/current-user.decorator';
import { User, UserRole } from '@prisma/client';
import { Roles } from 'src/_common/decorators/roles.decorator';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { ProgressReportEntity } from 'src/reports/progress/entities/progress.entity';
import { TimesheetReportEntity } from 'src/reports/timesheet/entities/timesheet.entity';
import { CreateTimesheetDto } from 'src/reports/timesheet/dto/create-timesheet.dto';
import { CreateProgressDto } from 'src/reports/progress/dto/create-progress.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('users/me')
export class UsersMeController {
  constructor(private readonly usersService: UsersMeService) {}

  @ApiOperation({ summary: 'Report progress [USER ACCEESS]' })
  @ApiOkResponse({
    description: 'Success report progress',
    type: ProgressReportEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as User',
  })
  @Roles(UserRole.ENG_PE, UserRole.ENG_SE)
  @Post('progress-reports')
  async reportProgress(
    @CurrentUser() user: User,
    @Body() data: CreateProgressDto
  ) {
    return this.usersService.reportProgress(data, user);
  }

  @ApiOperation({ summary: 'Report timesheet [USER ACCEESS]' })
  @ApiOkResponse({
    description: 'Success report timesheet',
    type: TimesheetReportEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as User',
  })
  @Roles(UserRole.ENG_PE, UserRole.ENG_SE)
  @Post('timesheet-reports')
  async reportTimesheet(
    @CurrentUser() user: User,
    @Body() data: CreateTimesheetDto
  ) {
    return this.usersService.reportTimesheet(data, user);
  }

  @ApiOperation({ summary: 'Get my timesheet reports [USER ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many timesheet reports',
    type: [TimesheetReportEntity],
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as User',
  })
  @Roles(UserRole.ENG_PE, UserRole.ENG_SE)
  @Get('timesheet-reports')
  async myTimesheetReports(@CurrentUser() user: User) {
    return this.usersService.myTimesheetReports(user.id);
  }

  @ApiOperation({ summary: 'Get my progress reports [USER ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many progress reports',
    type: [ProgressReportEntity],
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as User',
  })
  @Roles(UserRole.ENG_PE, UserRole.ENG_SE)
  @Get('progress-reports')
  async myProgressReports(@CurrentUser() user: User) {
    return this.usersService.myProgressReports(user.id);
  }

  @ApiOperation({ summary: 'Get my projects [USER ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many projects',
    type: [ProjectEntity],
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as User',
  })
  @Roles(UserRole.PM, UserRole.ENG_PE, UserRole.ENG_SE)
  @Get('projects')
  async myProjects(@CurrentUser() user: User) {
    return this.usersService.myProjects(user.code);
  }

  @ApiOperation({ summary: 'Get all users [USER ACCEESS]' })
  @ApiOkResponse({
    description: 'Success find many users',
    type: UserEntity,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as User',
  })
  @Roles(
    UserRole.ADMIN,
    UserRole.PM,
    UserRole.ENG_PE,
    UserRole.ENG_SE,
    UserRole.ENG_LEAD
  )
  @Get()
  async findMe(@CurrentUser() user: User) {
    const res = await this.usersService.findOne(user.id);
    return plainToInstance(UserEntity, res);
  }

  @ApiOperation({ summary: 'Update one user [USER ACCEESS]' })
  @ApiOkResponse({
    description: 'Success update one user',
    type: UserEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as User',
  })
  @Roles(
    UserRole.ADMIN,
    UserRole.PM,
    UserRole.ENG_PE,
    UserRole.ENG_SE,
    UserRole.ENG_LEAD
  )
  @Patch()
  async update(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const res = await this.usersService.update(user.id, updateUserDto);
    return plainToInstance(UserEntity, res);
  }
}
