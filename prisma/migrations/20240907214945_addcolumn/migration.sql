/*
  Warnings:

  - Added the required column `className` to the `FlightClassRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlightClassRole" ADD COLUMN     "className" TEXT NOT NULL;
