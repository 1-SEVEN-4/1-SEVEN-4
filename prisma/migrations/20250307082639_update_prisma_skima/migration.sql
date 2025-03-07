/*
  Warnings:

  - You are about to drop the column `badgeId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `badgeId` on the `GroupBadge` table. All the data in the column will be lost.
  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerNickname]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupBadgeName` to the `GroupBadge` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('likeCountbadge', 'recordbadge', 'memberBadges');

-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_recordId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "GroupBadge" DROP CONSTRAINT "GroupBadge_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "GroupBadge" DROP CONSTRAINT "GroupBadge_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_groupId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "badgeId";

-- AlterTable
ALTER TABLE "GroupBadge" DROP COLUMN "badgeId",
ADD COLUMN     "groupBadgeName" "BadgeType" NOT NULL;

-- DropTable
DROP TABLE "Badge";

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_ownerNickname_key" ON "Group"("ownerNickname");

-- AddForeignKey
ALTER TABLE "GroupBadge" ADD CONSTRAINT "GroupBadge_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
