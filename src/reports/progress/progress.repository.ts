import { Injectable } from '@nestjs/common';
import { Prisma, ProgressReport, UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ReportQueryDto } from 'src/reports/dto/query-report.dto';
import { CustomResponse } from 'src/_common/res/response';

@Injectable()
export class ProgressRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: ReportQueryDto): Promise<ProgressReport[]> {
    const where: ReportQueryDto = {};
    if (query?.userId || query?.projectId || query?.pjtPhaseId) {
      where.OR = [];
      if (query?.userId) where.OR.push({ userId: query.userId });
      if (query?.projectId) where.OR.push({ projectId: query.projectId });
      if (query?.pjtPhaseId) where.OR.push({ pjtPhaseId: query.pjtPhaseId });
    }
    console.log(where);
    const findAll = await this.prisma.progressReport.findMany({ where });
    return findAll;
  }

  async findOne(id: number): Promise<ProgressReport | null> {
    return await this.prisma.progressReport.findUnique({ where: { id } });
  }

  async create(
    data: Prisma.ProgressReportCreateInput
  ): Promise<ProgressReport> {
    return await this.prisma.progressReport.create({ data });
  }

  async update(
    id: number,
    data: Prisma.ProgressReportUpdateInput
  ): Promise<ProgressReport> {
    return await this.prisma.progressReport.update({ where: { id }, data });
  }

  async remove(id: number): Promise<CustomResponse> {
    await this.prisma.progressReport.delete({ where: { id } });
    return {
      status: 200,
      message: `Progress Report #${id} has been deleted`,
    };
  }

  async findByPmId(pmId: number): Promise<ProgressReport[]> {
    return await this.prisma.progressReport.findMany({
      where: {
        project: {
          assignedPMId: pmId, // only projects where this user is the PM
        },
        user: {
          userRole: {
            in: [UserRole.ENG_PE, UserRole.ENG_SE], // only reports from PE/SE
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            userRole: true,
          },
        },
        project: {
          select: {
            id: true,
            pjtNo: true,
            pjtName: true,
          },
        },
        phase: {
          select: {
            id: true,
            phaseName: true,
          },
        },
      },
      orderBy: {
        reportDate: 'desc',
      },
    });
  }
}
