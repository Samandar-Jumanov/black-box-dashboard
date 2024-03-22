/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FeedBacks" ALTER COLUMN "collectionId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CollectionUpdates" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionUpdates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- AddForeignKey
ALTER TABLE "CollectionUpdates" ADD CONSTRAINT "CollectionUpdates_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
