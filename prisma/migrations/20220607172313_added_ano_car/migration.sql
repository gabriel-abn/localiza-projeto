/*
  Warnings:

  - Added the required column `ano` to the `Carro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carro` ADD COLUMN `ano` INTEGER NOT NULL;
