import {
  ConflictException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { ProgressReport, Project, TimesheetReport, User } from '@prisma/client';
import { hashPassword } from 'src/_common/utils/hashing';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { ProgressRepository } from 'src/reports/progress/progress.repository';
import { TimesheetRepository } from 'src/reports/timesheet/timesheet.repository';
import { CreateTimesheetDto } from 'src/reports/timesheet/dto/create-timesheet.dto';
import { TimesheetService } from 'src/reports/timesheet/timesheet.service';
import { ProgressService } from 'src/reports/progress/progress.service';
import { CreateProgressDto } from 'src/reports/progress/dto/create-progress.dto';

@Injectable()
export class UsersMeService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly progressRepository: ProgressRepository,
    private readonly timesheetRepository: TimesheetRepository,
    private readonly progressService: ProgressService,
    private readonly timesheetService: TimesheetService
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} is not found`);
    }
    return user;
  }

  async findByCode(code: string): Promise<User> {
    const user = await this.usersRepository.findByCode(code);
    if (!user) {
      throw new NotFoundException(`User #${code} is not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const isUserExist = await this.usersRepository.findOne(id);
    if (!isUserExist) {
      throw new NotFoundException(`User #${id} is not found`);
    }
    if (updateUserDto.code) {
      const isCodeExist = await this.usersRepository.findByCode(
        updateUserDto.code
      );
      if (isCodeExist) {
        throw new ConflictException('User already exists');
      }
    }
    if (updateUserDto.password) {
      const passwordHash = await hashPassword(updateUserDto.password);
      const modifiedUserDto = {
        ...updateUserDto,
        passwordHash: passwordHash,
        password: undefined,
      };
      return this.usersRepository.update(id, modifiedUserDto);
    } else {
      return this.usersRepository.update(id, updateUserDto);
    }
  }

  async myProjects(userCode: string): Promise<Project[]> {
    const myProjects = await this.projectsRepository.findAll({ userCode });
    if (myProjects.length < 1) {
      throw new NotFoundException('No data found');
    }
    return myProjects;
  }

  async myProgressReports(userId: number): Promise<ProgressReport[]> {
    const myProgressReports = await this.progressRepository.findAll({ userId });
    if (myProgressReports.length < 1) {
      throw new NotFoundException('No data found');
    }
    return myProgressReports;
  }

  async myTimesheetReports(userId: number): Promise<TimesheetReport[]> {
    const myTimesheetReports = await this.timesheetRepository.findAll({
      userId,
    });
    if (myTimesheetReports.length < 1) {
      throw new NotFoundException('No data found');
    }
    return myTimesheetReports;
  }

  async reportProgress(
    data: CreateProgressDto,
    user: User
  ): Promise<ProgressReport> {
    const modifiedData = { ...data, userId: user.id };
    return await this.progressService.create(modifiedData);
  }

  async reportTimesheet(
    data: CreateTimesheetDto,
    user: User
  ): Promise<TimesheetReport> {
    const modifiedData = { ...data, userId: user.id };
    return await this.timesheetService.create(modifiedData);
  }
}
