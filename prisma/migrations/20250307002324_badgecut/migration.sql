/*
  Warnings:

  - You are about to drop the column `badgeId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `badgeId` on the `GroupBadge` table. All the data in the column will be lost.
  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_recordId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "GroupBadge" DROP CONSTRAINT "GroupBadge_badgeId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "badgeId";

-- AlterTable
ALTER TABLE "GroupBadge" DROP COLUMN "badgeId";

-- DropTable
DROP TABLE "Badge";
