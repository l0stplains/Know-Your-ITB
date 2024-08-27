/*
  Warnings:

  - A unique constraint covering the columns `[themeId,number]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Question_number_key";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "number" DROP DEFAULT;
DROP SEQUENCE "Question_number_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Question_themeId_number_key" ON "Question"("themeId", "number");
