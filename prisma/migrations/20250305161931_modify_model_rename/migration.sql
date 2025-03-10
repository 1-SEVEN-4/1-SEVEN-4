/*
  Warnings:

  - You are about to drop the column `discordInvitationURL` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `discordWebhookURL` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `goalCount` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupName` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupNickname` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupPassword` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupPhoto` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `memberNickname` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `memberPassword` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `recordPhoto` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `timer` on the `Record` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerNickname]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nickname]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Group_groupName_key";

-- DropIndex
DROP INDEX "Group_groupNickname_key";

-- DropIndex
DROP INDEX "Member_memberNickname_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "discordInvitationURL",
DROP COLUMN "discordWebhookURL",
DROP COLUMN "goalCount",
DROP COLUMN "groupName",
DROP COLUMN "groupNickname",
DROP COLUMN "groupPassword",
DROP COLUMN "groupPhoto",
ADD COLUMN     "discordURL" TEXT,
ADD COLUMN     "goalRep" INTEGER,
ADD COLUMN     "invitationURL" TEXT,
ADD COLUMN     "likeCount" INTEGER,
ADD COLUMN     "memberCount" INTEGER,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "ownerNickname" TEXT,
ADD COLUMN     "ownerPassword" TEXT,
ADD COLUMN     "photo" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "memberNickname",
DROP COLUMN "memberPassword",
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "recordPhoto",
DROP COLUMN "timer",
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "time" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Group_ownerNickname_key" ON "Group"("ownerNickname");

-- CreateIndex
CREATE UNIQUE INDEX "Member_nickname_key" ON "Member"("nickname");
