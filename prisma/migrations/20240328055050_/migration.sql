/*
  Warnings:

  - You are about to drop the `ActiveCollections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActiveCollections" DROP CONSTRAINT "ActiveCollections_collectionId_fkey";

-- DropTable
DROP TABLE "ActiveCollections";
