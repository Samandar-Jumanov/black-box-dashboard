/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Collections` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collections" DROP CONSTRAINT "Collections_userEmail_fkey";

-- AlterTable
ALTER TABLE "Collections" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
