/*
  Warnings:

  - Made the column `collectionId` on table `FeedBacks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FeedBacks" DROP CONSTRAINT "FeedBacks_collectionId_fkey";

-- AlterTable
ALTER TABLE "Emails" ADD COLUMN     "collectionId" TEXT;

-- AlterTable
ALTER TABLE "FeedBacks" ALTER COLUMN "collectionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FeedBacks" ADD CONSTRAINT "FeedBacks_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emails" ADD CONSTRAINT "Emails_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
