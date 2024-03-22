-- DropForeignKey
ALTER TABLE "FeedBacks" DROP CONSTRAINT "FeedBacks_collectionId_fkey";

-- AddForeignKey
ALTER TABLE "FeedBacks" ADD CONSTRAINT "FeedBacks_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
