/*
  Warnings:

  - You are about to drop the column `cartao` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `cliente` table. All the data in the column will be lost.
  - Added the required column `image` to the `Carro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cliente` DROP FOREIGN KEY `Cliente_carroPlaca_fkey`;

-- AlterTable
ALTER TABLE `carro` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `cartao`,
    DROP COLUMN `cpf`,
    DROP COLUMN `dataNascimento`,
    DROP COLUMN `endereco`;
