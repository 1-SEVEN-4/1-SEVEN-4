-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_badgeId_fkey";

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "badgeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("badgeId") ON DELETE SET NULL ON UPDATE CASCADE;
