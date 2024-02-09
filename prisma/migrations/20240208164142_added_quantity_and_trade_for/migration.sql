/*
  Warnings:

  - Added the required column `quantity` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "tradefor" TEXT[] DEFAULT ARRAY[]::TEXT[];
