/*
  Warnings:

  - Added the required column `time2` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "time2" INTEGER NOT NULL,
ALTER COLUMN "time" SET DATA TYPE TEXT;
