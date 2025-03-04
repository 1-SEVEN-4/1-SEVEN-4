/*
  Warnings:

  - You are about to drop the column `groupNicname` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[groupNickname]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupNickname` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Group_groupNicname_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "groupNicname",
ADD COLUMN     "groupNickname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_groupNickname_key" ON "Group"("groupNickname");
