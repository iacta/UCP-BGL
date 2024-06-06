/*
  Warnings:

  - You are about to drop the column `name` on the `promotion` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `promotion` table. All the data in the column will be lost.
  - Added the required column `title` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promotion` DROP COLUMN `name`,
    DROP COLUMN `userId`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
