-- CreateTable
CREATE TABLE `Cliente` (
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `cnh` VARCHAR(191) NOT NULL,
    `dataNascimento` DATETIME(3) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cartao` VARCHAR(191) NOT NULL,
    `senhaAcesso` VARCHAR(191) NOT NULL,
    `carroPlaca` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cnh`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carro` (
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`placa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historico` (
    `clienteCnh` VARCHAR(191) NOT NULL,
    `carroPlaca` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `dataAlocacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataDevolucao` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_carroPlaca_fkey` FOREIGN KEY (`carroPlaca`) REFERENCES `Carro`(`placa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_clienteCnh_fkey` FOREIGN KEY (`clienteCnh`) REFERENCES `Cliente`(`cnh`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_carroPlaca_fkey` FOREIGN KEY (`carroPlaca`) REFERENCES `Carro`(`placa`) ON DELETE RESTRICT ON UPDATE CASCADE;
