/*
  Warnings:

  - You are about to alter the column `airlineName` on the `Airline` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropIndex
DROP INDEX "Airline_airlineName_key";

-- AlterTable
ALTER TABLE "Airline" ALTER COLUMN "airlineName" SET DATA TYPE VARCHAR(255);
