import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsRepository } from './projects.repository';
import { Project } from '@prisma/client';
import { CustomResponse, CustomResponseCheck } from 'src/_common/res/response';
import { ProjectQueryDto } from './dto/query-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async findAll(query?: ProjectQueryDto): Promise<Project[]> {
    return this.projectsRepository.findAll(query);
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project #${id} is not found`);
    }
    return project;
  }

  async findByPjtNo(pjtNo: string): Promise<Project> {
    const project = await this.projectsRepository.findByPjtNo(pjtNo);
    if (!project) {
      throw new NotFoundException(`Project #${pjtNo} is not found`);
    }
    return project;
  }

  async create(data: CreateProjectDto): Promise<Project> {
    const isExist = await this.projectsRepository.findByPjtNo(data.pjtNo);
    if (isExist) {
      throw new NotFoundException(`Project #${data.pjtNo} already exists`);
    }
    return this.projectsRepository.create(data);
  }

  async update(id: number, data: UpdateProjectDto): Promise<Project> {
    const project = await this.projectsRepository.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project #${id} is not found`);
    }
    return this.projectsRepository.update(id, data);
  }

  async remove(id: number): Promise<CustomResponse> {
    const project = await this.projectsRepository.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project #${id} is not found`);
    }
    return this.projectsRepository.remove(id);
  }

  async checkIfPjtNoExists(pjtNo: string): Promise<CustomResponseCheck> {
    const isExist = await this.projectsRepository.findByPjtNo(pjtNo);
    if (!isExist) {
      return {
        exists: false,
      };
    } else {
      return {
        exists: true,
      };
    }
  }
}
