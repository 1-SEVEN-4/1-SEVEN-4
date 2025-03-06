/*
  Warnings:

  - You are about to drop the column `InvitationURL` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `NicKname` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `Nickname` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nickName]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nickName]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invitationURL` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickName` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickName` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Group_NicKname_key";

-- DropIndex
DROP INDEX "Member_Nickname_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "InvitationURL",
DROP COLUMN "NicKname",
DROP COLUMN "Password",
ADD COLUMN     "invitationURL" TEXT NOT NULL,
ADD COLUMN     "nickName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "Nickname",
DROP COLUMN "Password",
ADD COLUMN     "nickName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_nickName_key" ON "Group"("nickName");

-- CreateIndex
CREATE UNIQUE INDEX "Member_nickName_key" ON "Member"("nickName");
