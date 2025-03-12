/*
  Warnings:

  - You are about to drop the column `nickName` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `GroupTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupTags" DROP CONSTRAINT "GroupTags_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_memberId_fkey";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "nickName",
DROP COLUMN "password";

-- DropTable
DROP TABLE "GroupTags";

-- DropTable
DROP TABLE "Members";

-- CreateTable
CREATE TABLE "GroupTag" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "GroupTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" UUID NOT NULL,
    "nickName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupTag" ADD CONSTRAINT "GroupTag_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
