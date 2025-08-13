-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ENG_PE', 'ENG_SE', 'ENG_LEAD', 'PM', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."Department" AS ENUM ('Delivery', 'Service');

-- CreateEnum
CREATE TYPE "public"."ExecutionStatus" AS ENUM ('LAGGING', 'ONTRACK', 'LEADING');

-- CreateTable
CREATE TABLE "public"."Phase" (
    "id" SERIAL NOT NULL,
    "phaseCode" TEXT NOT NULL,
    "phaseName" TEXT NOT NULL,
    "weightFactor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userRole" "public"."UserRole" NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "dept" "public"."Department" NOT NULL,
    "joinAt" TIMESTAMP(3) NOT NULL,
    "isResigned" BOOLEAN NOT NULL DEFAULT false,
    "resignedAt" TIMESTAMP(3),
    "tokens" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "pjtNo" TEXT NOT NULL,
    "pjtName" TEXT NOT NULL,
    "epcName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "assignedPMId" INTEGER,
    "assignedPEId" INTEGER,
    "assignedSEId" INTEGER,
    "currentPhaseId" INTEGER,
    "executionStatus" "public"."ExecutionStatus" NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "timeStart" TIMESTAMP(3) NOT NULL,
    "timeEnd" TIMESTAMP(3) NOT NULL,
    "phase1EndDate" TIMESTAMP(3),
    "phase2EndDate" TIMESTAMP(3),
    "phase3EndDate" TIMESTAMP(3),
    "phase4EndDate" TIMESTAMP(3),
    "phase5EndDate" TIMESTAMP(3),
    "phase6EndDate" TIMESTAMP(3),
    "phase7EndDate" TIMESTAMP(3),
    "phase8EndDate" TIMESTAMP(3),
    "phase9EndDate" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserProjectsAssignment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProjectsAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TimesheetReport" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "pjtPhaseId" INTEGER NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "hoursPerDay" DECIMAL(5,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimesheetReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProgressReport" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "pjtPhaseId" INTEGER NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "thisWeekTask" TEXT NOT NULL,
    "thisWeekIssue" TEXT NOT NULL,
    "nextWeekTask" TEXT NOT NULL,
    "advancePhase" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgressReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Phase_phaseCode_key" ON "public"."Phase"("phaseCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_code_key" ON "public"."User"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Project_pjtNo_key" ON "public"."Project"("pjtNo");

-- CreateIndex
CREATE UNIQUE INDEX "UserProjectsAssignment_userId_projectId_key" ON "public"."UserProjectsAssignment"("userId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TimesheetReport_userId_projectId_pjtPhaseId_reportDate_key" ON "public"."TimesheetReport"("userId", "projectId", "pjtPhaseId", "reportDate");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressReport_userId_projectId_pjtPhaseId_reportDate_key" ON "public"."ProgressReport"("userId", "projectId", "pjtPhaseId", "reportDate");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_assignedPMId_fkey" FOREIGN KEY ("assignedPMId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_assignedPEId_fkey" FOREIGN KEY ("assignedPEId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_assignedSEId_fkey" FOREIGN KEY ("assignedSEId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_currentPhaseId_fkey" FOREIGN KEY ("currentPhaseId") REFERENCES "public"."Phase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProjectsAssignment" ADD CONSTRAINT "UserProjectsAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProjectsAssignment" ADD CONSTRAINT "UserProjectsAssignment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TimesheetReport" ADD CONSTRAINT "TimesheetReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TimesheetReport" ADD CONSTRAINT "TimesheetReport_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TimesheetReport" ADD CONSTRAINT "TimesheetReport_pjtPhaseId_fkey" FOREIGN KEY ("pjtPhaseId") REFERENCES "public"."Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProgressReport" ADD CONSTRAINT "ProgressReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProgressReport" ADD CONSTRAINT "ProgressReport_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProgressReport" ADD CONSTRAINT "ProgressReport_pjtPhaseId_fkey" FOREIGN KEY ("pjtPhaseId") REFERENCES "public"."Phase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
