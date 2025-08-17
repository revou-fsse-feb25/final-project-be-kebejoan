/*
  Warnings:

  - A unique constraint covering the columns `[userId,projectId,reportDate]` on the table `ProgressReport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,projectId,reportDate]` on the table `TimesheetReport` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."ProgressReport_userId_projectId_pjtPhaseId_reportDate_key";

-- DropIndex
DROP INDEX "public"."TimesheetReport_userId_projectId_pjtPhaseId_reportDate_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProgressReport_userId_projectId_reportDate_key" ON "public"."ProgressReport"("userId", "projectId", "reportDate");

-- CreateIndex
CREATE UNIQUE INDEX "TimesheetReport_userId_projectId_reportDate_key" ON "public"."TimesheetReport"("userId", "projectId", "reportDate");
