/*
  Warnings:

  - You are about to drop the column `badgeName` on the `Badge` table. All the data in the column will be lost.
  - Added the required column `groupBadgeName` to the `GroupBadge` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('likeCountbadge', 'recordbadge', 'memberBadges');

-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "badgeName";

-- AlterTable
ALTER TABLE "GroupBadge" ADD COLUMN     "groupBadgeName" "BadgeType" NOT NULL;
