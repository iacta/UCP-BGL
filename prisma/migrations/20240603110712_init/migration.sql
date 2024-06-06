/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Promotion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Promotion_title_key` ON `Promotion`(`title`);
