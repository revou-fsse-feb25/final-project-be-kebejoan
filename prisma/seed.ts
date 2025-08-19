// prisma/seed.ts
import {
  PrismaClient,
  UserRole,
  Department,
  ExecutionStatus,
} from '@prisma/client';
// import { Decimal } from '@prisma/client/runtime/library';
import { hashPassword } from '../src/_common/utils/hashing';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL, // 👈 override DATABASE_URL
    },
  },
});

async function main() {
  console.log('Creating phase lookup table...');

  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "User", "Project", "Phase" RESTART IDENTITY CASCADE`
  );

  const phaseLookup: {
    phaseCode: string;
    phaseName: string;
    weightFactor: number;
  }[] = [
    { phaseCode: 'P1', phaseName: 'Sales Handover', weightFactor: 0.5 },
    { phaseCode: 'P2', phaseName: 'Basic Design', weightFactor: 0.5 },
    { phaseCode: 'P3', phaseName: 'Detail Design', weightFactor: 1 },
    { phaseCode: 'P4', phaseName: 'Internal Test', weightFactor: 1 },
    {
      phaseCode: 'P5',
      phaseName: 'Factory Acceptance Test (FAT)',
      weightFactor: 1.2,
    },
    { phaseCode: 'P6', phaseName: 'FAT Recovery', weightFactor: 1 },
    { phaseCode: 'P7', phaseName: 'Shipment', weightFactor: 0.7 },
    {
      phaseCode: 'P8',
      phaseName: 'Site Acceptance Test and Commisioning',
      weightFactor: 1.5,
    },
    { phaseCode: 'P9', phaseName: 'Service Handover', weightFactor: 0.7 },
  ];

  await prisma.phase.createMany({
    data: phaseLookup,
  });

  console.log('Seeding users...');

  const userEntries: {
    name: string;
    code: string;
    userRole: UserRole;
    dept: Department;
  }[] = [
    // ENG_PE
    {
      name: 'Engineer PE 1',
      code: 'PE1',
      userRole: UserRole.ENG_PE,
      dept: Department.Delivery,
    },
    {
      name: 'Engineer PE 2',
      code: 'PE2',
      userRole: UserRole.ENG_PE,
      dept: Department.Delivery,
    },
    {
      name: 'Engineer PE 3',
      code: 'PE3',
      userRole: UserRole.ENG_PE,
      dept: Department.Delivery,
    },
    {
      name: 'Engineer PE 4',
      code: 'PE4',
      userRole: UserRole.ENG_PE,
      dept: Department.Service,
    },
    {
      name: 'Engineer PE 5',
      code: 'PE5',
      userRole: UserRole.ENG_PE,
      dept: Department.Service,
    },

    // ENG_SE
    {
      name: 'Engineer SE 1',
      code: 'SE1',
      userRole: UserRole.ENG_SE,
      dept: Department.Delivery,
    },
    {
      name: 'Engineer SE 2',
      code: 'SE2',
      userRole: UserRole.ENG_SE,
      dept: Department.Delivery,
    },
    {
      name: 'Engineer SE 3',
      code: 'SE3',
      userRole: UserRole.ENG_SE,
      dept: Department.Delivery,
    },
    {
      name: 'Engineer SE 4',
      code: 'SE4',
      userRole: UserRole.ENG_SE,
      dept: Department.Service,
    },
    {
      name: 'Engineer SE 5',
      code: 'SE5',
      userRole: UserRole.ENG_SE,
      dept: Department.Service,
    },

    // PM
    {
      name: 'Project Manager 1',
      code: 'PM1',
      userRole: UserRole.PM,
      dept: Department.Delivery,
    },
    {
      name: 'Project Manager 2',
      code: 'PM2',
      userRole: UserRole.PM,
      dept: Department.Delivery,
    },

    // ENG_LEAD
    {
      name: 'Lead Engineer 1',
      code: 'LE1',
      userRole: UserRole.ENG_LEAD,
      dept: Department.Delivery,
    },
    {
      name: 'Lead Engineer 2',
      code: 'LE2',
      userRole: UserRole.ENG_LEAD,
      dept: Department.Delivery,
    },

    // ADMIN
    {
      name: 'Admin User',
      code: 'ADM',
      userRole: UserRole.ADMIN,
      dept: Department.Delivery,
    },
  ];

  // Pre-hash passwords (password = code)
  const userData = await Promise.all(
    userEntries.map(async (u) => ({
      ...u,
      passwordHash: await hashPassword(u.code),
      joinAt: new Date('2023-01-01'),
    }))
  );

  await prisma.user.createMany({ data: userData });

  const users = await prisma.user.findMany();
  const pmUsers = users.filter((u) => u.userRole === UserRole.PM);
  const peUsers = users.filter((u) => u.userRole === UserRole.ENG_PE);
  const seUsers = users.filter((u) => u.userRole === UserRole.ENG_SE);

  console.log('Seeding projects...');

  const project1 = await prisma.project.create({
    data: {
      pjtNo: 'PJT-1001',
      pjtName: 'Project Alpha',
      epcName: 'EPC Company A',
      ownerName: 'Owner A',
      assignedPMId: pmUsers[0].id,
      assignedPEId: peUsers[0].id,
      assignedSEId: seUsers[0].id,
      currentPhaseId: 1,
      executionStatus: ExecutionStatus.ONTRACK,
      timeStart: new Date('2024-01-01'),
      timeEnd: new Date('2024-12-31'),
      phase1EndDate: new Date('2024-02-01'),
      phase2EndDate: new Date('2024-03-01'),
      phase3EndDate: new Date('2024-04-01'),
      phase4EndDate: new Date('2024-05-01'),
      phase5EndDate: new Date('2024-06-01'),
      phase6EndDate: new Date('2024-07-01'),
      phase7EndDate: new Date('2024-08-01'),
      phase8EndDate: new Date('2024-09-01'),
      phase9EndDate: new Date('2024-10-01'),
    },
  });

  const project2 = await prisma.project.create({
    data: {
      pjtNo: 'PJT-1002',
      pjtName: 'Project Beta',
      epcName: 'EPC Company B',
      ownerName: 'Owner B',
      assignedPMId: pmUsers[1].id,
      assignedPEId: peUsers[1].id,
      assignedSEId: seUsers[1].id,
      currentPhaseId: 2,
      executionStatus: ExecutionStatus.ONTRACK,
      timeStart: new Date('2024-02-01'),
      timeEnd: new Date('2024-11-30'),
      phase1EndDate: new Date('2024-03-01'),
      phase2EndDate: new Date('2024-04-01'),
      phase3EndDate: new Date('2024-05-01'),
      phase4EndDate: new Date('2024-06-01'),
      phase5EndDate: new Date('2024-07-01'),
      phase6EndDate: new Date('2024-08-01'),
      phase7EndDate: new Date('2024-09-01'),
      phase8EndDate: new Date('2024-10-01'),
      phase9EndDate: new Date('2024-11-01'),
    },
  });

  const project3 = await prisma.project.create({
    data: {
      pjtNo: 'PJT-1003',
      pjtName: 'Project Gamma',
      epcName: 'EPC Company C',
      ownerName: 'Owner C',
      assignedPMId: pmUsers[0].id,
      assignedPEId: peUsers[2].id,
      assignedSEId: seUsers[2].id,
      currentPhaseId: 3,
      executionStatus: ExecutionStatus.ONTRACK,
      timeStart: new Date('2024-03-01'),
      timeEnd: new Date('2024-12-15'),
      phase1EndDate: new Date('2024-04-01'),
      phase2EndDate: new Date('2024-05-01'),
      phase3EndDate: new Date('2024-06-01'),
      phase4EndDate: new Date('2024-07-01'),
      phase5EndDate: new Date('2024-08-01'),
      phase6EndDate: new Date('2024-09-01'),
      phase7EndDate: new Date('2024-10-01'),
      phase8EndDate: new Date('2024-11-01'),
      phase9EndDate: new Date('2024-12-01'),
    },
  });

  console.log('Seeding assignments...');

  const allProjects = [project1, project2, project3];
  for (const project of allProjects) {
    await prisma.userProjectsAssignment.createMany({
      data: [
        { userId: project.assignedPMId!, projectId: project.id },
        { userId: project.assignedPEId!, projectId: project.id },
        { userId: project.assignedSEId!, projectId: project.id },
      ],
    });
  }

  console.log('Seeding timesheets & progress reports...');

  for (const project of allProjects) {
    for (const userId of [project.assignedPEId!, project.assignedSEId!]) {
      for (let phaseId = 1; phaseId <= 9; phaseId++) {
        const reportDate = new Date(
          `2024-06-${String(phaseId).padStart(2, '0')}`
        );

        await prisma.timesheetReport.create({
          data: {
            userId,
            projectId: project.id,
            pjtPhaseId: phaseId,
            reportDate,
            hoursPerDay: new Decimal(8.0),
          },
        });

        await prisma.progressReport.create({
          data: {
            userId,
            projectId: project.id,
            pjtPhaseId: phaseId,
            reportDate,
            thisWeekTask: `Task for phase ${phaseId}`,
            thisWeekIssue: `Issue for phase ${phaseId}`,
            nextWeekTask: `Next task for phase ${phaseId}`,
            advancePhase: phaseId % 2 === 0,
          },
        });
      }
    }
  }

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
