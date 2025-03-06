/*
  Warnings:

  - You are about to drop the column `likeCount` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `member` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `record` on the `Badge` table. All the data in the column will be lost.
  - Added the required column `badgeName` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "likeCount",
DROP COLUMN "member",
DROP COLUMN "record",
ADD COLUMN     "badgeName" TEXT NOT NULL;
