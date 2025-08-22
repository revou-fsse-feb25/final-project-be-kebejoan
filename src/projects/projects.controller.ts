import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { CustomResponseCheck } from 'src/_common/res/response';
import { ProjectQueryDto } from './dto/query-project.dto';
import { RolesGuard } from 'src/_common/guards/role.guard';
import { JwtAuthGuard } from 'src/_common/guards/jwt-auth.guard';
import { Roles } from 'src/_common/decorators/roles.decorator';
import { CurrentUser } from 'src/_common/decorators/current-user.decorator';
import { User, UserRole } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('refresh_token')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Check if pjtNo is exists' })
  @ApiOkResponse({
    description: 'Success check if pjtNo is exists',
    type: CustomResponseCheck,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Roles(UserRole.ADMIN, UserRole.PM)
  @Get('pjtNo/:pjtNo/check')
  async checkIfPjtNoExists(@Param('pjtNo') pjtNo: string) {
    return this.projectsService.checkIfPjtNoExists(pjtNo);
  }

  @ApiOperation({ summary: 'Get one project by pjtNo [ADMIN/PM ACCEESS]' })
  @ApiOkResponse({
    description: 'Success get one project by pjtNo',
    type: ProjectEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Roles(
    UserRole.ADMIN,
    UserRole.PM,
    UserRole.ENG_PE,
    UserRole.ENG_SE,
    UserRole.ENG_LEAD
  )
  @Get('pjtNo/:pjtNo')
  async findByPjtNo(@Param('pjtNo') pjtNo: string) {
    return this.projectsService.findByPjtNo(pjtNo);
  }

  @ApiOperation({ summary: 'Create one project [ADMIN/PM ACCEESS]' })
  @ApiOkResponse({
    description: 'Success create one project',
    type: ProjectEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Roles(UserRole.ADMIN, UserRole.PM)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @ApiOperation({ summary: 'Get all projects [ADMIN/PM ACCEESS]' })
  @ApiOkResponse({
    description: 'Success get all projects',
    type: [ProjectEntity],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(@Query() query?: ProjectQueryDto) {
    return this.projectsService.findAll(query);
  }

  @ApiOperation({ summary: 'Get one project [ADMIN/PM ACCEESS]' })
  @ApiOkResponse({
    description: 'Success get one project',
    type: ProjectEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Roles(
    UserRole.ADMIN,
    UserRole.PM,
    UserRole.ENG_PE,
    UserRole.ENG_SE,
    UserRole.ENG_LEAD
  )
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one project [ADMIN/PM ACCEESS]' })
  @ApiOkResponse({
    description: 'Success update one project',
    type: ProjectEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Roles(UserRole.ADMIN, UserRole.PM)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @ApiOperation({ summary: 'Delete one project [ADMIN/PM ACCEESS]' })
  @ApiOkResponse({
    description: 'Success delete one project',
    type: ProjectEntity,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized or not logged in as Admin',
  })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
