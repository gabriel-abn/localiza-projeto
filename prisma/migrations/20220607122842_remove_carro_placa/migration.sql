/*
  Warnings:

  - You are about to drop the column `carroPlaca` on the `cliente` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Cliente_carroPlaca_fkey` ON `cliente`;

-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `carroPlaca`;
