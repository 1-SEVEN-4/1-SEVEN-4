/*
  Warnings:

  - You are about to drop the column `ownerNickname` on the `Group` table. All the data in the column will be lost.
  - The `tags` column on the `Group` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ownerNickName]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerNickName` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_memberId_fkey";

-- DropIndex
DROP INDEX "Group_ownerNickname_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "ownerNickname",
ADD COLUMN     "ownerNickName" TEXT NOT NULL,
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "Members" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "groupId" TEXT,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_nickName_key" ON "Members"("nickName");

-- CreateIndex
CREATE UNIQUE INDEX "Group_ownerNickName_key" ON "Group"("ownerNickName");

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
