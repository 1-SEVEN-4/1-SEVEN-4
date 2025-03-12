/*
  Warnings:

  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GroupBadge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GroupTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Record` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupBadge" DROP CONSTRAINT "GroupBadge_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupTag" DROP CONSTRAINT "GroupTag_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_memberId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP CONSTRAINT "Group_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "memberCount" SET DEFAULT 1,
ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GroupBadge" DROP CONSTRAINT "GroupBadge_pkey",
ALTER COLUMN "groupBadgeId" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GroupBadge_pkey" PRIMARY KEY ("groupBadgeId");

-- AlterTable
ALTER TABLE "GroupTag" DROP CONSTRAINT "GroupTag_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GroupTag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Record" DROP CONSTRAINT "Record_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "memberId" SET DATA TYPE TEXT,
ALTER COLUMN "groupId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Record_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "Members" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

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
