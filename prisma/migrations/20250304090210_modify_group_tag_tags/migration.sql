/*
  Warnings:

  - You are about to drop the column `tag` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT;
