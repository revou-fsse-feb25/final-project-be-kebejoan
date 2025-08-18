import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersMeController } from './me.controller';
import { UsersMeService } from './me.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [ProjectsModule, ReportsModule],
  controllers: [UsersMeController, UsersController],
  providers: [UsersMeService, UsersService, UsersRepository],
  exports: [UsersMeService, UsersService, UsersRepository],
})
export class UsersModule {}
