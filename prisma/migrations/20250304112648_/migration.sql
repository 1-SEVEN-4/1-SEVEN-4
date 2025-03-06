/*
  Warnings:

  - You are about to drop the column `invitationURL` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `memberCount` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `nickName` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `recommendations` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[NicKname]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `InvitationURL` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NicKname` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendation` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sports" AS ENUM ('RUNNING', 'CYCLING', 'SWIMMING');

-- DropIndex
DROP INDEX "Group_nickName_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "invitationURL",
DROP COLUMN "memberCount",
DROP COLUMN "nickName",
DROP COLUMN "password",
DROP COLUMN "photo",
DROP COLUMN "recommendations",
ADD COLUMN     "InvitationURL" TEXT NOT NULL,
ADD COLUMN     "NicKname" TEXT NOT NULL,
ADD COLUMN     "Password" TEXT NOT NULL,
ADD COLUMN     "Photo" TEXT,
ADD COLUMN     "recommendation" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "Nickname" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "sports" "Sports" NOT NULL,
    "description" TEXT NOT NULL,
    "timer" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL,
    "recordPhoto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_Nickname_key" ON "Member"("Nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Group_NicKname_key" ON "Group"("NicKname");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
