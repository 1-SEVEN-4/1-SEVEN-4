/*
  Warnings:

  - You are about to drop the column `ownerNickname` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerNickName]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerNickName` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Group_ownerNickname_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "ownerNickname",
ADD COLUMN     "ownerNickName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_ownerNickName_key" ON "Group"("ownerNickName");
