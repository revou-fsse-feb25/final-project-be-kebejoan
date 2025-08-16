import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Project } from '@prisma/client';
import { CustomResponse } from 'src/_common/res/response';

@Injectable()
export class ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOne(id: number): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { id } });
  }

  async findByPjtNo(pjtNo: string): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { pjtNo } });
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async update(id: number, data: Prisma.ProjectUpdateInput): Promise<Project> {
    return this.prisma.project.update({ where: { id }, data });
  }

  async remove(id: number): Promise<CustomResponse> {
    await this.prisma.project.delete({ where: { id } });
    return {
      status: 200,
      message: `Project #${id} has been deleted`,
    };
  }
}
