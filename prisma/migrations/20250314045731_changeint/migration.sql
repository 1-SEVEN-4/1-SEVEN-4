/*
  Warnings:

  - You are about to drop the column `time2` on the `Record` table. All the data in the column will be lost.
  - Changed the type of `time` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "time2",
DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL;
