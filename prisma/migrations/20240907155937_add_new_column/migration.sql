/*
  Warnings:

  - Added the required column `country` to the `Airline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Airline" ADD COLUMN     "country" VARCHAR(255) NOT NULL;
