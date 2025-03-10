/*
  Warnings:

  - Made the column `description` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discordURL` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `goalRep` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `invitationURL` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `likeCount` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `memberCount` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerNickname` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ownerPassword` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nickname` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time` on table `Record` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "discordURL" SET NOT NULL,
ALTER COLUMN "goalRep" SET NOT NULL,
ALTER COLUMN "invitationURL" SET NOT NULL,
ALTER COLUMN "likeCount" SET NOT NULL,
ALTER COLUMN "memberCount" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "ownerNickname" SET NOT NULL,
ALTER COLUMN "ownerPassword" SET NOT NULL;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "nickname" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "time" SET NOT NULL;
