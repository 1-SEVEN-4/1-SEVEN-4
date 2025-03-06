/*
  Warnings:

  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `goalCount` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupName` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `nickName` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `recommendation` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Group` table. All the data in the column will be lost.
  - The primary key for the `Record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recordPhoto` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `timer` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `badgeId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goalRep` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberCount` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerNickName` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerPassword` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Group` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `description` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `nickName` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sports` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `groupId` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `memberId` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_memberId_fkey";

-- DropIndex
DROP INDEX "Group_groupName_key";

-- DropIndex
DROP INDEX "Group_nickName_key";

-- AlterTable
ALTER TABLE "Group" DROP CONSTRAINT "Group_pkey",
DROP COLUMN "goalCount",
DROP COLUMN "groupName",
DROP COLUMN "nickName",
DROP COLUMN "password",
DROP COLUMN "recommendation",
DROP COLUMN "tag",
ADD COLUMN     "badgeId" UUID NOT NULL,
ADD COLUMN     "goalRep" INTEGER NOT NULL,
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "memberCount" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "ownerNickName" TEXT NOT NULL,
ADD COLUMN     "ownerPassword" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Record" DROP CONSTRAINT "Record_pkey",
DROP COLUMN "recordPhoto",
DROP COLUMN "timer",
ADD COLUMN     "nickName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "sports",
ADD COLUMN     "sports" TEXT NOT NULL,
DROP COLUMN "groupId",
ADD COLUMN     "groupId" UUID NOT NULL,
DROP COLUMN "memberId",
ADD COLUMN     "memberId" UUID NOT NULL,
ADD CONSTRAINT "Record_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Member";

-- DropEnum
DROP TYPE "Sports";

-- CreateTable
CREATE TABLE "GroupTags" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "GroupTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" UUID NOT NULL,
    "nickName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "badgeId" UUID NOT NULL,
    "member" BOOLEAN NOT NULL DEFAULT false,
    "record" BOOLEAN NOT NULL DEFAULT false,
    "likeCount" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" UUID,
    "recordId" UUID,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("badgeId")
);

-- CreateTable
CREATE TABLE "GroupBadge" (
    "groupBadgeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "badgeId" UUID NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "GroupBadge_pkey" PRIMARY KEY ("groupBadgeId")
);

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("badgeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupTags" ADD CONSTRAINT "GroupTags_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupBadge" ADD CONSTRAINT "GroupBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("badgeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupBadge" ADD CONSTRAINT "GroupBadge_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
