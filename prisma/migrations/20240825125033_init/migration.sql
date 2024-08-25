/*
  Warnings:

  - You are about to drop the `HmifDepartment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ukm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "HmifDepartment";

-- DropTable
DROP TABLE "Ukm";

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
