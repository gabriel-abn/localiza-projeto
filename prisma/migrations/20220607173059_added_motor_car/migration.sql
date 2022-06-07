/*
  Warnings:

  - Added the required column `motor` to the `Carro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carro` ADD COLUMN `motor` DOUBLE NOT NULL;
