/*
  Warnings:

  - You are about to drop the column `Photo` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "Photo",
ADD COLUMN     "photo" TEXT;
