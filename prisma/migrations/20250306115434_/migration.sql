/*
  Warnings:

  - You are about to drop the column `badgeId` on the `Group` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_badgeId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "badgeId",
ADD COLUMN     "badgeBadgeId" UUID;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_badgeBadgeId_fkey" FOREIGN KEY ("badgeBadgeId") REFERENCES "Badge"("badgeId") ON DELETE SET NULL ON UPDATE CASCADE;
