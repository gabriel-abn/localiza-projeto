/*
  Warnings:

  - Made the column `dataDevolucao` on table `historico` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `historico` ALTER COLUMN `dataAlocacao` DROP DEFAULT,
    MODIFY `dataDevolucao` DATETIME(3) NOT NULL;
