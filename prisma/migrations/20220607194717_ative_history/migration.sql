/*
  Warnings:

  - Added the required column `ativo` to the `Historico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `historico` ADD COLUMN `ativo` BOOLEAN NOT NULL;
