import { Injectable } from '@nestjs/common';
import { Prisma, TimesheetReport } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ReportQueryDto } from 'src/reports/dto/qeury-report.dto';
import { CustomResponse } from 'src/_common/res/response';

@Injectable()
export class TimesheetRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: ReportQueryDto): Promise<TimesheetReport[]> {
    const where: ReportQueryDto = {};
    if (query?.userId || query?.projectId || query?.pjtPhaseId) {
      where.OR = [];
      if (query?.userId) where.OR.push({ userId: query.userId });
      if (query?.projectId) where.OR.push({ projectId: query.projectId });
      if (query?.pjtPhaseId) where.OR.push({ pjtPhaseId: query.pjtPhaseId });
    }
    const findAll = await this.prisma.timesheetReport.findMany({ where });
    return findAll;
  }

  async findOne(id: number): Promise<TimesheetReport | null> {
    return await this.prisma.timesheetReport.findUnique({ where: { id } });
  }

  async create(
    data: Prisma.TimesheetReportCreateInput
  ): Promise<TimesheetReport> {
    return await this.prisma.timesheetReport.create({ data });
  }

  async update(
    id: number,
    data: Prisma.TimesheetReportUpdateInput
  ): Promise<TimesheetReport> {
    return await this.prisma.timesheetReport.update({ where: { id }, data });
  }

  async remove(id: number): Promise<CustomResponse> {
    await this.prisma.timesheetReport.delete({ where: { id } });
    return {
      status: 200,
      message: `Timesheet Report #${id} has been deleted`,
    };
  }
}
