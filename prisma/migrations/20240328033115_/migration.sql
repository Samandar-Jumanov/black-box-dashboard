-- CreateTable
CREATE TABLE "ActiveCollections" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "ActiveCollections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActiveCollections" ADD CONSTRAINT "ActiveCollections_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
