/*
  Warnings:

  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `badgeId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `ownerNickName` on the `Group` table. All the data in the column will be lost.
  - The primary key for the `GroupBadge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `badgeId` on the `GroupBadge` table. All the data in the column will be lost.
  - The primary key for the `Members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nickName` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Record` table. All the data in the column will be lost.
  - The `photo` column on the `Record` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupTags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerNickname]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nickName]` on the table `Members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerNickname` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupBadgeName` to the `GroupBadge` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sports` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sports" AS ENUM ('RUNNING', 'CYCLING', 'SWIMMING');

-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('likeCountBadge', 'recordBadge', 'memberBadges');

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
ALTER TABLE "GroupTags" DROP CONSTRAINT "GroupTags_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_memberId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP CONSTRAINT "Group_pkey",
DROP COLUMN "badgeId",
DROP COLUMN "ownerNickName",
ADD COLUMN     "ownerNickname" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "memberCount" SET DEFAULT 1,
ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GroupBadge" DROP CONSTRAINT "GroupBadge_pkey",
DROP COLUMN "badgeId",
ADD COLUMN     "groupBadgeName" "BadgeType" NOT NULL,
ALTER COLUMN "groupBadgeId" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GroupBadge_pkey" PRIMARY KEY ("groupBadgeId");

-- AlterTable
ALTER TABLE "Members" DROP CONSTRAINT "Members_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Members_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Record" DROP CONSTRAINT "Record_pkey",
DROP COLUMN "nickName",
DROP COLUMN "password",
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "sports",
ADD COLUMN     "sports" "Sports" NOT NULL,
ALTER COLUMN "time" SET DATA TYPE TEXT,
DROP COLUMN "photo",
ADD COLUMN     "photo" TEXT[],
ALTER COLUMN "memberId" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Record_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "GroupTags";

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
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_ownerNickname_key" ON "Group"("ownerNickname");

-- CreateIndex
CREATE UNIQUE INDEX "Members_nickName_key" ON "Members"("nickName");

-- AddForeignKey
ALTER TABLE "GroupBadge" ADD CONSTRAINT "GroupBadge_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTag" ADD CONSTRAINT "GroupTag_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
