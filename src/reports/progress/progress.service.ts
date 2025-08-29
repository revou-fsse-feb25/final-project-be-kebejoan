import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProgressRepository } from './progress.repository';
import { Prisma, ProgressReport, User, UserRole } from '@prisma/client';
import { ReportQueryDto } from 'src/reports/dto/query-report.dto';
import { CustomResponse } from 'src/_common/res/response';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private readonly progressRepository: ProgressRepository) {}

  async findAll(user: User, query?: ReportQueryDto): Promise<ProgressReport[]> {
    const isAdmin = user.userRole === UserRole.ADMIN;

    const findAll = await this.progressRepository.findAllForPM(
      isAdmin ? undefined : user.id,
      query
    );

    if (findAll.length < 1) {
      throw new NotFoundException('No data found');
    }
    return findAll;
  }

  async findOne(id: number): Promise<ProgressReport | null> {
    const findOne = await this.progressRepository.findOne(id);
    if (!findOne) {
      throw new NotFoundException(`Progress Report #${id} is not found`);
    }
    return await this.progressRepository.findOne(id);
  }

  async create(data: CreateProgressDto): Promise<ProgressReport> {
    const modifiedData = {
      ...data,
      userId: undefined,
      projectId: undefined,
      pjtPhaseId: undefined,
    };
    try {
      return await this.progressRepository.create({
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

  async update(id: number, data: UpdateProgressDto): Promise<ProgressReport> {
    const isExist = await this.progressRepository.findOne(id);
    if (!isExist) {
      throw new NotFoundException(`Progress Report #${id} is not found`);
    }
    return await this.progressRepository.update(id, data);
  }

  async remove(id: number): Promise<CustomResponse> {
    const isExist = await this.progressRepository.findOne(id);
    if (!isExist) {
      throw new NotFoundException(`Progress Report #${id} is not found`);
    }
    return await this.progressRepository.remove(id);
  }

  async findByPmId(pmId: number): Promise<ProgressReport[]> {
    const reports = await this.progressRepository.findByPmId(pmId);
    if (reports.length < 1) {
      throw new NotFoundException('No data found');
    }
    return await this.progressRepository.findByPmId(pmId);
  }
}
