/*
  Warnings:

  - Added the required column `userEmail` to the `Collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collections" DROP CONSTRAINT "Collections_userId_fkey";

-- AlterTable
ALTER TABLE "Collections" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
