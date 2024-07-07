-- CreateTable
CREATE TABLE `Banidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NOT NULL,
    `issuedBy` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userID` INTEGER NOT NULL,

    UNIQUE INDEX `Banidos_userID_key`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Banidos` ADD CONSTRAINT `Banidos_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
