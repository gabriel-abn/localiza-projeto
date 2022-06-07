/*
  Warnings:

  - Added the required column `isAdmin` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `isAdmin` BOOLEAN NOT NULL;
