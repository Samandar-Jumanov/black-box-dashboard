/*
  Warnings:

  - Added the required column `userEmail` to the `ActiveCollection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActiveCollection" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ActiveCollection" ADD CONSTRAINT "ActiveCollection_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
