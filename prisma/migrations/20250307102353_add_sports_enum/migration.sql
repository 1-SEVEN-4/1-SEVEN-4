/*
  Warnings:

  - Changed the type of `sports` on the `Record` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sports" AS ENUM ('RUNNING', 'CYCLING', 'SWIMMING');

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "sports",
ADD COLUMN     "sports" "Sports" NOT NULL;
