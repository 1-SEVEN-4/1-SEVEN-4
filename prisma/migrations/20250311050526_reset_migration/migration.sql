/*
  Warnings:

  - The values [likeCountbadge,recordbadge] on the enum `BadgeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BadgeType_new" AS ENUM ('likeCountBadge', 'recordBadge', 'memberBadges');
ALTER TABLE "GroupBadge" ALTER COLUMN "groupBadgeName" TYPE "BadgeType_new" USING ("groupBadgeName"::text::"BadgeType_new");
ALTER TYPE "BadgeType" RENAME TO "BadgeType_old";
ALTER TYPE "BadgeType_new" RENAME TO "BadgeType";
DROP TYPE "BadgeType_old";
COMMIT;
