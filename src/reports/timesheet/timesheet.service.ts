import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TimesheetRepository } from './timesheet.repository';
import { Prisma, TimesheetReport } from '@prisma/client';
import { CustomResponse } from 'src/_common/res/response';
import { ReportQueryDto } from '../dto/query-report.dto';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';

@Injectable()
export class TimesheetService {
  constructor(private readonly timesheetRepository: TimesheetRepository) {}

  async findAll(query?: ReportQueryDto): Promise<TimesheetReport[]> {
    const findAll = await this.timesheetRepository.findAll(query);
    if (findAll.length < 1) {
      throw new NotFoundException('No data found');
    }
    return findAll;
  }

  async findOne(id: number): Promise<TimesheetReport | null> {
    const findOne = await this.timesheetRepository.findOne(id);
    if (!findOne) {
      throw new NotFoundException(`Progress Report #${id} is not found`);
    }
    return await this.timesheetRepository.findOne(id);
  }

  async create(data: CreateTimesheetDto): Promise<TimesheetReport> {
    const modifiedData = {
      ...data,
      userId: undefined,
      projectId: undefined,
      pjtPhaseId: undefined,
    };
    try {
      return await this.timesheetRepository.create({
        ...modifiedData,
        user: { connect: { id: data.userId } },
        project: { connect: { id: data.projectId } },
        phase: { connect: { id: data.pjtPhaseId } },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // P2002 = unique constraint violation
          throw new ConflictException(
            `Timesheet for user ${data.userId} on project ${data.projectId} at ${data.reportDate} already exists`
          );
        }
      }
      throw error;
    }
  }

  async update(id: number, data: UpdateTimesheetDto): Promise<TimesheetReport> {
    const isExist = await this.timesheetRepository.findOne(id);
    if (!isExist) {
      throw new NotFoundException(`Timesheet Report #${id} is not found`);
    }
    return await this.timesheetRepository.update(id, data);
  }

  async remove(id: number): Promise<CustomResponse> {
    const isExist = await this.timesheetRepository.findOne(id);
    if (!isExist) {
      throw new NotFoundException(`Timesheet Report #${id} is not found`);
    }
    return await this.timesheetRepository.remove(id);
  }
}
