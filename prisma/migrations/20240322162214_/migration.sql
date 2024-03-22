/*
  Warnings:

  - You are about to drop the column `bugName` on the `FeedBacks` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `FeedBacks` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `FeedBacks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FeedBacks" DROP COLUMN "bugName",
ADD COLUMN     "userEmail" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
