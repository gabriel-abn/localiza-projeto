-- DropForeignKey
ALTER TABLE `Cliente` DROP FOREIGN KEY `Cliente_carroPlaca_fkey`;

-- AlterTable
ALTER TABLE `Cliente` MODIFY `carroPlaca` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_carroPlaca_fkey` FOREIGN KEY (`carroPlaca`) REFERENCES `Carro`(`placa`) ON DELETE SET NULL ON UPDATE CASCADE;
