-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `horasHoje` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `horasSemanal` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `horasTotal` INTEGER NOT NULL DEFAULT 0;
