import { Injectable, NotFoundException } from '@nestjs/common';
import { ProgressRepository } from './progress.repository';
import { ProgressReport } from '@prisma/client';
import { ReportQueryDto } from 'src/reports/dto/qeury-report.dto';
import { CustomResponse } from 'src/_common/res/response';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private readonly progressRepository: ProgressRepository) {}

  async findAll(query?: ReportQueryDto): Promise<ProgressReport[]> {
    const findAll = await this.progressRepository.findAll(query);
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
    return await this.progressRepository.create({
      ...data,
      user: { connect: { id: data.userId } },
      project: { connect: { id: data.projectId } },
      phase: { connect: { id: data.pjtPhaseId } },
    });
  }

  async update(id: number, data: UpdateProgressDto): Promise<ProgressReport> {
    return await this.progressRepository.update(id, data);
  }

  async remove(id: number): Promise<CustomResponse> {
    return await this.progressRepository.remove(id);
  }
}
