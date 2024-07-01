-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `nick` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `socio` VARCHAR(191) NOT NULL DEFAULT '',
    `moedas` INTEGER NOT NULL DEFAULT 0,
    `uLogin` VARCHAR(191) NOT NULL DEFAULT '30/05/2024 - 12:12 PM',
    `skinID` INTEGER NOT NULL DEFAULT 264,
    `telefone` INTEGER NOT NULL DEFAULT 0,
    `staffLevel` INTEGER NOT NULL DEFAULT 0,
    `helper` BOOLEAN NOT NULL DEFAULT false,
    `nivel` INTEGER NOT NULL DEFAULT 0,
    `respeitos` INTEGER NOT NULL DEFAULT 0,
    `horasJogadas` INTEGER NOT NULL DEFAULT 0,
    `money` INTEGER NOT NULL DEFAULT 0,
    `bank` INTEGER NOT NULL DEFAULT 0,
    `ouros` INTEGER NOT NULL DEFAULT 0,
    `fabrica` INTEGER NOT NULL DEFAULT 0,
    `empresa` INTEGER NOT NULL DEFAULT 0,
    `propriedade` INTEGER NOT NULL DEFAULT 0,
    `casa` INTEGER NOT NULL DEFAULT 0,
    `casaAlugada` INTEGER NOT NULL DEFAULT 0,
    `matou` INTEGER NOT NULL DEFAULT 0,
    `morreu` INTEGER NOT NULL DEFAULT 0,
    `kd` DOUBLE NOT NULL DEFAULT 0.0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_nick_key`(`nick`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Promotion_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Delation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `relator` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `accused` VARCHAR(191) NOT NULL,
    `orgRelator` VARCHAR(191) NOT NULL,
    `orgAccused` VARCHAR(191) NOT NULL,
    `veredit` VARCHAR(191) NOT NULL DEFAULT 'none',
    `vereditDescription` VARCHAR(191) NOT NULL DEFAULT 'none',
    `adminReply` VARCHAR(191) NOT NULL DEFAULT 'none',
    `staff` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resolved` VARCHAR(191) NOT NULL DEFAULT 'none',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Revision` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `relator` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `staff` VARCHAR(191) NOT NULL,
    `veredit` VARCHAR(191) NOT NULL DEFAULT 'none',
    `vereditDescription` VARCHAR(191) NOT NULL DEFAULT 'none',
    `adminReply` VARCHAR(191) NOT NULL DEFAULT 'none',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resolved` VARCHAR(191) NOT NULL DEFAULT 'none',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nick` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `funcao` VARCHAR(191) NOT NULL,
    `atendimentos` INTEGER NOT NULL DEFAULT 0,
    `warns` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Staff_nick_key`(`nick`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Warn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NOT NULL,
    `issuedBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `staffID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_nick_fkey` FOREIGN KEY (`nick`) REFERENCES `Users`(`nick`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Warn` ADD CONSTRAINT `Warn_staffID_fkey` FOREIGN KEY (`staffID`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
