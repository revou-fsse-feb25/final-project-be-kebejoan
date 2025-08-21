/*
  Warnings:

  - You are about to alter the column `hoursPerDay` on the `TimesheetReport` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."TimesheetReport" ALTER COLUMN "hoursPerDay" SET DATA TYPE INTEGER;
