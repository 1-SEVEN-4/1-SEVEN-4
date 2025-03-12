/*
  Warnings:

  - You are about to drop the column `ownerNickName` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerNickname]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerNickname` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Made the column `groupId` on table `Members` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('likeCountbadge', 'recordbadge', 'memberBadges');

-- DropIndex
DROP INDEX "Group_ownerNickName_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "ownerNickName",
ADD COLUMN     "ownerNickname" TEXT NOT NULL,
ALTER COLUMN "likeCount" SET DEFAULT 0,
ALTER COLUMN "memberCount" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Members" ALTER COLUMN "groupId" SET NOT NULL;

-- CreateTable
CREATE TABLE "GroupBadge" (
    "groupBadgeId" TEXT NOT NULL,
    "groupBadgeName" "BadgeType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "GroupBadge_pkey" PRIMARY KEY ("groupBadgeId")
);

-- CreateTable
CREATE TABLE "GroupTag" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "GroupTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_ownerNickname_key" ON "Group"("ownerNickname");

-- AddForeignKey
ALTER TABLE "GroupBadge" ADD CONSTRAINT "GroupBadge_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTag" ADD CONSTRAINT "GroupTag_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
