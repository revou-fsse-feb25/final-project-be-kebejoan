import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { ReportsModule } from './reports/reports.module';
import { ReportModule } from './report/report.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    UsersModule, 
    ProjectsModule, 
    ProjectModule, 
    UserModule, 
    ReportsModule, 
    ReportModule, 
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
